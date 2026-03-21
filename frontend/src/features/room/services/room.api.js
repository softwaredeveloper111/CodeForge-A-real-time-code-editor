import axios from "axios";




const instance = axios.create({
  baseURL: 'https://codeforge-a-real-time-code-editor.onrender.com',
  withCredentials:true
});





export const createRoomApi = async (data) => {
  try {
    const response = await instance.post("/api/room",data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};





export const joinRoomApi = async (roomId) => {
  try {
    const response = await instance.post(`/api/room/join/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};





export const UserRoomListApi = async () => {
  try {
    const response = await instance.get(`/api/room/my/rooms`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};






export const getRoomApi = async (roomId) => {
  try {
    const response = await instance.get(`/api/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};






export const leaveRoomApi = async (roomId) => {
  try {
    const response = await instance.put(`/api/room/leave/${roomId}`);
  return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};





export const deleteRoomApi = async(roomId)=>{
  try {

    const response = await instance.delete(`/api/room/shutdown/${roomId}`)
    return response.data
    
  } catch (error) {
    console.log(error)
    throw error
  }
}