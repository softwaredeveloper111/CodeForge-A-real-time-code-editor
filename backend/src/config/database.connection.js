import mongoose from "mongoose";





async function connectToDB(){
  try {
     await  mongoose.connect(process.env.MONGO_URI);
     console.log("connected to database")

  } catch (error) {
    console.log(`connection problem ❌, ${error.message}`)
    process.exit(1);
  }
}





export default connectToDB;