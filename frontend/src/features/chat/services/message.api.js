import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getMessagesApi = async (roomId) => {
 try  {
    const response = await instance.get(`/api/message/${roomId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};