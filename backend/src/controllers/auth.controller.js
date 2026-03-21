import userModel from "../models/user.mode.js";
import AppError from "../utils/AppError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import jwt from "jsonwebtoken";
import redis from "../config/redis.connection.js";
import uploadFileToImageKIT  from "../services/Imagekit.service.js";





export const registerController =  asyncWrapper(async(req,res)=>{
  
  const {username,email,password} = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  });


  if(isUserAlreadyRegistered){
    throw new AppError("User is already registered", 409);
  }

 
  const newUser = await userModel.create({
    username,
    email,
    password,
   
  });

  const newUserObj = newUser.toObject();
  delete newUserObj.password;

  res.status(201).json({
    status:"success",
    message:"user registered successfully ",
    data:newUserObj
  })

})





export const  loginController = asyncWrapper(async(req,res)=>{
  const {identifier,password} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username:identifier},
      {email:identifier}
    ]
  }).select("+password");
  
  if(!user){
    throw new AppError("user is not found",404);
    
  }



  const isPasswordMatch = await user.comparePassword(password)

  if(!isPasswordMatch){
      throw new AppError("wrong password",401);
  }

 
  
  const token = jwt.sign({id:user._id,username:user.username}, process.env.JWT_SECRET_KEY)
res.cookie("JWT_TOKEN", token, {
  httpOnly: true,
  secure: true,                  
  sameSite: "none",              
  maxAge: 7 * 24 * 60 * 60 * 1000  
});

   const userObj = user.toObject();
  delete userObj.password

  res.status(200).json({
    success:true,
    message:"user loggedin sucessfully",
    data:userObj
  })
})







export const logoutController = asyncWrapper(async(req,res)=>{

  const token = req.cookies?.JWT_TOKEN;
  if(token){
   await redis.set(token,Date.now().toString(),"EX",60*60)
  }
  res.clearCookie("JWT_TOKEN", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
  res.status(200).json({
    success:true,
    message:"user logged out successfully"
  })
})






export const  getMeController= asyncWrapper(async(req,res)=>{
  const userId = req.user.id;
  const user = await userModel.findById(userId)
  if(!user){
    throw new AppError("user not found",404);
  }
  res.status(200).json({
    success:true,
    data:user
  })
})








export const updateProfileController = asyncWrapper(async(req,res)=>{
  
  const userId = req.user.id;
  const buffer = req.file.buffer;

  console.log(buffer)
  if(!buffer){
    throw new AppError("file not found",404);
  }
  const { thumbnailUrl} =  await uploadFileToImageKIT(buffer)
  // console.log(thumbnailUrl)


  const user = await userModel.findByIdAndUpdate(userId,{avatar:thumbnailUrl},{new:true})
  res.status(200).json({
    success:true,
    message:"profile updated successfully",
    data:user
  })
  
 
})