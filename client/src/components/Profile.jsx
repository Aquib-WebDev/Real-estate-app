import { useSelector } from "react-redux"

export default function () {
  const {currentUser} = useSelector((state)=> state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img src = {currentUser.avatar} alt= 'profileImage' className="cursor-pointer rounded-full w-24 h-24 mt-2 self-center object-cover" />
        <input type="text" placeholder="username" className="border p-3 rounded-lg"/>
        <input type="email " placeholder="email" className="border p-3 rounded-lg"/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-90 uppercase"> Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
