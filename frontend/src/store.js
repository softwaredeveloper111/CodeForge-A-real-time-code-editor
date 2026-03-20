import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/auth.slice";
import roomReducer from "./features/room/room.slice";
import chatReducer from "./features/chat/chat.slice";


export default configureStore({
  reducer: {
      authentication:authReducer,
      room:roomReducer,
      chat: chatReducer,
  }
})