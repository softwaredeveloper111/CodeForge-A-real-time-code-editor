import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const runCodeApi = async ({ code, language_id, stdin }) => {
  try {
    const response = await instance.post("/api/code/run", {
    code,
    language_id,
    stdin: stdin || "",
  });
  return response.data;
  } catch (error) {
    console.log(error.message)
    throw error
  }
};