import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
  roomId:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    required:[true, "room name must be required"],
    minlength: [3, "room title must be at least 5 characters long"],
    maxlength: [100, "room title must be at most 100 characters long"],


  },
  description:{
    type:String,
    trim:true,
    minlength: [3, "room description must be at least 10 characters long"],
    maxlength: [300, "room description must be at most 300 characters long"],
    required:[true,"room description must be required"],
    
  },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  participants:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  ],
  language:{
    type:String,
    default:"javascript",
  },

  code:{
    type:String,
    default:""
  },
  isActive:{
    type:Boolean,
    default:true,
  }

},{timestamps:true})


const roomModel = mongoose.model("Room",roomSchema)

export default roomModel