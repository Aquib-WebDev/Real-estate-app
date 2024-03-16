import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const navigate = useNavigate();
    const {currentUser} = useSelector((state)=> state.user);
  const [files, setFile] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,setError]= useState(false);
  const [loading,setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && formData.imageUrls.length + files.length < 7) {
      setUploading(true);
      setImageUploadError(null);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError(
            "Image Upload in error(2 MB per image is allowed)"
          );
          setUploading(false);
        });
    } else {
      setImageUploadError("Maximum 6 Images are allowed per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    

    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
        setFormData( {...formData , [e.target.id]  : e.target.checked})
    }
    if(e.target.type==='text'|| e.target.type === 'number' || e.target.type === 'textarea') {
        setFormData({...formData, [e.target.id] : e.target.value})
    }
  };
  const handleSubmit = async (e)=>{
    
    e.preventDefault();
    if(formData.imageUrls.length <1) return setError('Atleast 1 Image should be uplaoded for listing')
    if(formData.regularPrice < formData.discountedPrice) return setError ('Discounted price must be lesser than regular price')
    try {
        setLoading(true);
        setError(false);
        const res = await fetch ('/api/listing/create', {
            method :'POST',
            headers : {
                'Content-type' :'application/json'
            },
            body : JSON.stringify({...formData , userRef : currentUser._id})
        });
        const data = await res.json();
        setLoading(false);
        if(data.success === false){
            setError(data.message);
        }
        navigate(`/listing/${data._id}`)
    } catch (error) {
        setLoading(false);
        setError(error.message);
    }
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center my-7 text-semibold text-3xl">
        Create a Listing
      </h1>
      <form onSubmit =  {handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                className="p-3 rounded-lg border border-gray-300 "
                type="number"
                min="1"
                max="10"
                required
                id="bedrooms"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 rounded-lg border border-gray-300 "
                type="number"
                min="1"
                max="10"
                required
                id="bathrooms"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="px-8 py-4 rounded-lg border border-gray-300 "
                type="number"
                min="50"
                max="500000"
                required
                id="regularPrice"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            {formData.offer ? <div className="flex gap-2 items-center">
              <input
                className="px-8 py-4 rounded-lg border border-gray-300 "
                type="number"
                min="0"
                max="500000"
                required
                id="discountedPrice"
                onChange={handleChange}
                value={formData.discountedPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div> : ''}
            
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal ml-2 text-gray-600">
              The First Image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFile(e.target.files)}
              type="file"
              id="images"
              accept="images/*"
              multiple
              className="p-3 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700  border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="h-20 w-20 object-contain "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg border border-red-700 uppercase hover:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))}
          <button  disabled={loading || uploading} className="rounded-lg p-3 uppercase bg-slate-700 text-white hover:opacity-95 disabled-opacity-50">
         { loading ? 'Creating ... ': 'Create Listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
