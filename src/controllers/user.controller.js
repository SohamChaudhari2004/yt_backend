import asyncHandeler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnColudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandeler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  if (
    [fullName, email, username, password].some((field) => {
      field.trim() === "";
    })
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = User.findOne({
    $or: [[email], { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or email not exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is needed");
  }

  const avatar = await uploadOnColudinary(avatarLocalPath);
  const coverImage = await uploadOnColudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar is needed");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "" ,
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await user.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500 , "something went wrong during registration process")
  }

  return res.status(201).json(
    new ApiResponse(200 , createdUser , "user registered successfully")
  )

});

export default registerUser;
