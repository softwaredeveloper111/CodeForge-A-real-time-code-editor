import Redis from "ioredis";



const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});



redis.on("connect",()=>{
  console.log("connected to redis successfully");
})


redis.on("error",(err)=>{
  console.log("error in connecting to redis",err.message);
})



export default redis