import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only your account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can delete only your account"));
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json("User has been deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req,res,next) => {

  try {
    if (req.user.id === req.params.id)
    {
     const listings = await Listing.find({userRef : req.params.id})
     res.status(200).json(listings);
    }else
    {
      return next(errorHandler(401, "You can only view your own listings"));
    }
    
  } catch (error) {
    next(error);
  }

}