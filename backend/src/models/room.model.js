import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
  roomId:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type:String,
    default: "Untitled Room",
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
    default:"javascript"
  },

  code:{
    type:String,
    default:""
  },
  isActive:{
    type:Boolean,
    default:true,
  }

})


const roomModel = mongoose.model("Room",roomSchema)

export default roomModel