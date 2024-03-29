import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";
import { fileURLToPath } from "url";
import { uploadOnCloudinary } from "../utils/cloudinary.fileupload.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false }); // does not need to check validation

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went while generating refresh and token! "
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, avatar, password } = req.body;

  if (
    [username, email, firstName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Email must be valid");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(401, "user with email or username is already exist ");
  }

  //   const __filename = fileURLToPath(import.meta.url);
  //   const __dirname = path.dirname(__filename);

  // const file = req.files.avatar;
  // console.log("get file ", file);

  //   let filepath =
  //     __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
  //   console.log("file path ->>  ", filepath);

  //     file.mv(filepath, (err) => {
  //       console.log(err);
  //     });

  console.log("uploading to thread app : ");

  // const response = uploadOnCloudinary(file, "Thread_App");
  // console.log(response);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    avatar,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.json(
    new ApiResponse(200, createdUser, "User registered successfully !!")
  );
});

const userLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log("89", email);

  console.log("91", req.body);

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required !!");
  }

  //instance of object
  const user = await User.findOne({
    email:email, //array ke andar object pass kr sakte ho
  });

  console.log(user)

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  console.log(user)

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // send cookies - while sending cookies we need to design options
  // cookies can be modified by default from frontend
  const options = {
    httpOnly: true,
    secure: true,
  }; //this cookies can only modified from server only

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          // user: accessToken,
          refreshToken,
          loggedInUser,
        },
        "user logged In sucessfully!!"
      )
    );
});

export const Google = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        userExist._id
      );
      const loggedInUser = await User.findById(userExist._id).select(
        "-password -refreshToken"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              // user: accessToken,
              refreshToken,
              loggedInUser,
            },
            "user logged In sucessfully!!"
          )
        );
    } else {
      // here user is not exist
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // creating the random 16 digit password
      const newUser = await User.create({
        firstName: req.body.name,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.photo,
      });
      console.log(newUser);
      const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        newUser._id
      );
      const loggedInUser = await User.findById(userExist._id).select(
        "-password -refreshToken"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              // user: accessToken,
              refreshToken,
              loggedInUser,
            },
            "user logged In sucessfully!!"
          )
        );
    }
  } catch (error) {
    console.log("error while  login with google ", error);
  }
};

export { userRegister, userLogin };
