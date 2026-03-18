import "dotenv/config";
import {server} from "./src/app.js";
import connectToDB from "./src/config/database.connection.js";
import  "./src/config/redis.connection.js";



const PORT = process.env.PORT || 3000;
connectToDB()





server.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})