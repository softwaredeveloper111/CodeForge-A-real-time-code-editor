import jwt from "jsonwebtoken";  
import asyncWrapper from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";
import redis from "../config/redis.connection.js";





const identifyingUser = asyncWrapper(async(req,res,next)=>{
   const token = req.cookies?.JWT_TOKEN
   if(!token){
    throw new AppError("token not found" , 401);
   }
  

   const isBlackListToken = await redis.get(token);
   if(isBlackListToken){
    throw new AppError("Unthorized access",401)
   }

   
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  }
  catch(error){
      throw new AppError("invalid token" , 401);
  }

})






export default identifyingUser