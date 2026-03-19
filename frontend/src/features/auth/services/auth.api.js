import axios from "axios";





const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials:true
});





export const registerApi = async (data)=>{
   try {
     const response = await instance.post('/api/auth/register',data)
     return response.data
   } catch (error) {
    console.log(error)
    throw error
   }
}



export const loginApi = async (data)=>{
  try {
    const response = await instance.post('/api/auth/login',data)
    return response.data
  } catch (error) {
   console.log(error)
   throw error
  }
}



export const getMeApi = async ()=>{
try {

  const response = await instance.get('/api/auth/me')
  return response.data
  
} catch (error) {
  console.log(error);
  throw error
}
}





export const logoutApi = async()=>{
  try {
    const response = await instance.post("/api/auth/logout")
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}






export const resendVerificationEmailApi = async (data)=>{
  try {
    const response = await instance.post("/api/auth/resend-email",data)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}