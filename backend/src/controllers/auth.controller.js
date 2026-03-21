import userModel from "../models/user.mode.js";
import AppError from "../utils/AppError.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import crypto from "crypto";
import sendEmail from "../services/mail.service.js";
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

  const token = crypto.randomBytes(32).toString("hex");
  const newUser = await userModel.create({
    username,
    email,
    password,
    emailVerificationToken: token,
    emailVerificationTokenExpires: Date.now() + 24*60*60*1000 
  });


  const verifyLink = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}&email=${email}`;

  await sendEmail({
    to:email,
    subject:"welcome to CodeForge",
    text:"please verify your email",
    html:`
    <p>Hi ${username}</p>
     <p>Please verify your email by clicking the link below:</p>
    <a href="${verifyLink}">Verify Email</a>
     <p>This link expires in 1 hour.</p>
    <p>Thank you for regisrering at <Strong>CodeForge</Strong>, we're excited to have you onBoard</p>
    <p>Best regards,<br>The codeForge team</p>
    `
  });

  const newUserObj = newUser.toObject();
  delete newUserObj.password;

  res.status(201).json({
    status:"success",
    message:"user registered successfully , please verify your email for login",
    data:newUserObj
  })

})







export const verifyEmailController = asyncWrapper(async(req,res)=>{
  const {token,email} = req.query;
  const user = await userModel.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpires: {$gt: Date.now()}
  });


 if(!user){
  // Check if user exists by username and is already verified
  const existingUser = await userModel.findOne({ email });
  if (existingUser && existingUser.verified) {
    const html=`
    <html>
      <head>
      <title>Email Already Verified</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; }
        h1 { color: #28a745; margin-bottom: 20px; }
        p { color: #555; font-size: 16px; line-height: 1.6; }
        .button { display: inline-block; margin-top: 20px; padding: 10px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .button:hover { background: #764ba2; }
      </style>
      </head>
      <body>
        <div class="container">
          <h1>✓ Email Already Verified</h1>
          <p>Your email has already been verified. You can log in to your account.</p>
          <a href="https://codeforge-a-real-time-code-editor.onrender.com/auth/login" class="button">Go to Login</a>
        </div>
      </body>
    </html>

    `
    return  res.send(html)
  } else {
    throw new AppError("Invalid or expired token",400);
  }
}


  user.verified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save();  
const html = 
`<html>
  <head>
    <title>Email Verified</title>
    <style>
      body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .container { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; }
      h1 { color: #28a745; margin-bottom: 20px; }
      p { color: #555; font-size: 16px; line-height: 1.6; }
      .button { display: inline-block; margin-top: 20px; padding: 10px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
      .button:hover { background: #764ba2; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>✓ Email Verified Successfully</h1>
      <p>Your email has been verified and your account is now active.</p>
      <p>You can now log in and access all features.</p>
      <a href="http://localhost:5173/auth/login" class="button">Go to Login</a>
    </div>
  </body>
</html>` 

res.send(html)

})






export const resendEmailController = asyncWrapper(async(req,res)=>{
  console.log('heli')
  const {identifier} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username:identifier},
      {email:identifier}
    ]
  });

  if(!user){
    throw new AppError("User not found",404);
  } else if(user.verified){
    throw new AppError("Email is already verified",400);
  }


  const token = crypto.randomBytes(32).toString("hex");

   await userModel.findByIdAndUpdate(user._id,{
   emailVerificationToken:token,
  emailVerificationTokenExpires:Date.now()+3600000 /** token will expire after 1 hour */
  },{new:true})

   const verifyLink = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${token}&email=${user.email}`;


  sendEmail(
   {
    to:user.email,
    subject:"welcome to CodeForge",
    text:"please verify your email",
    html:`
    <p>Hi ${user.username}</p>
     <p>Please verify your email by clicking the link below:</p>
    <a href="${verifyLink}">Verify Email</a>
     <p>This link expires in 1 hour.</p>
    <p>Thank you for regisrering at <Strong>CodeForge</Strong>, we're excited to have you onBoard</p>
    <p>Best regards,<br>The codeForge team</p>
    `
  }
);

  res.status(200).json({
    success:true,
    message:"verification email resent successfully"
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


  const isUserVerified = user.verified
  if(!isUserVerified){
     throw new AppError("user is not verified",401);
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