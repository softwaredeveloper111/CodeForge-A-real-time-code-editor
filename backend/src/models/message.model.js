import mongoose from "mongoose";





const messageSchema = new mongoose.Schema({
  
 roomId: {
      type: String,
      required: true,
      index: true, 
    },

 sender:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
  required: true,
 },


 text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

  // optional (future use)
    type: {
      type: String,
      enum: ["text", "system"],
      default: "text",
    },
  
},{ timestamps: true})


const messageModel = mongoose.model("message", messageSchema);



export default messageModel