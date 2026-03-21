import axios from "axios";

const instance = axios.create({
  baseURL: "https://codeforge-a-real-time-code-editor.onrender.com",
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