import roomModel from "../models/room.model.js";
import messageModel from "../models/message.model.js"
import asyncWrapper from "../utils/asyncWrapper.js";
import AppError from "../utils/AppError.js";
import { nanoid } from 'nanoid'




export const createRoomController = asyncWrapper(async(req,res)=>{
  
  const {name , description, language} = req.body
  const userId = req.user.id;
  
  const room = await roomModel.create({
    name,
    description,
    roomId:nanoid(8),
    createdBy:userId,
    participants:[userId],
    language,

  });

  res.status(201).json({
    success:true,
    message:"room created sucessfully",
    data:room
  })

})





export const joinRoomController = asyncWrapper(async(req,res)=>{
  const roomId = req.params.roomId;
  const userId = req.user.id;

  const room = await roomModel.findOne({roomId})
  if(!room){
    throw new AppError("Room not found",404);
  }
 

  if(room.participants.includes(userId)){
    throw new AppError("You are already in the room",400);
  }

  room.participants.push(userId);
  await room.save();

  res.status(200).json({
    success:true,
    message:"room joined successfully",
    data:room
  })
   

})






export const getRoomController = asyncWrapper(async(req,res)=>{
  const roomId = req.params.roomId;
  const room = await roomModel.findOne({roomId})
  .populate("participants","username  email  avatar")
  .populate("createdBy", "username  email  avatar");

  if(!room){
    throw new AppError("Room not found",404);
  }
  res.status(200).json({
    success:true,
    data:room
  })
})





export const leaveRoomController = asyncWrapper(async(req,res)=>{
  const roomId = req.params.roomId;
  const userId = req.user.id;

  const room = await roomModel.findOne({roomId});
  if(!room){
    throw new AppError("room not found",404);
  }
 

  if(!room.participants.includes(userId)){
    throw new AppError("You are not in the room",400);
  }

  room.participants.pull(userId);
  await room.save();

  res.status(200).json({
    success:true,
    message:"room left successfully",
    data:room
  })

})





export const getMyRoomsConroller = asyncWrapper(async(req,res)=>{
  const userId = req.user.id;
  const rooms = await roomModel.find({participants:userId}).
  populate("createdBy", "username email")
 .populate("participants", "username email avatar") 
  .sort({ updatedAt: -1 });


  res.status(200).json({
    success:true,
    count: rooms.length,
    data:rooms
  })
})






export const deleteRoomController = asyncWrapper(async (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.user.id;

  const room = await roomModel.findOne({ roomId });
  if (!room) throw new AppError("Room not found", 404);

  // ✅ sirf creator delete kar sakta hai
  if (room.createdBy.toString() !== userId) {
    throw new AppError("Only creator can shutdown this room", 403);
  }

  await roomModel.findOneAndDelete({ roomId });
  // messages bhi delete karo
  await messageModel.deleteMany({ roomId });

  res.status(200).json({
    success: true,
    message: "Room shutdown successfully",
  });
});
