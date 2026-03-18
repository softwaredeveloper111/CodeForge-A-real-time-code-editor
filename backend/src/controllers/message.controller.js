import messageModel from "../models/message.model.js"
import roomModel from "../models/room.model.js"
import asyncWrapper from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";





export const  getMessagesController = asyncWrapper(async(req,res)=>{

  const roomId = req.params.roomId;

  const room = await roomModel.findOne({roomId});

  if(!room){
     throw new AppError("room is not found", 404)
  }

   const messages = await messageModel.find({ roomId })
      .populate("sender", "username avatar")
      .sort({ createdAt: 1 }) 

  return res.status(200).json({
    success:true,
    count: messages.length,
    message:"all messsages fetch succesfuly",
    data: messages
  })

})




