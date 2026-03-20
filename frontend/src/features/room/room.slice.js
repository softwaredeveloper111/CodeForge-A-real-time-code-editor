import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  users: [],
  messages: [],
  isConnected: false,
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    // ROOM SETUP
    setRoom: (state, action) => {
      state.roomId = action.payload;
    },

    clearRoom: (state) => {
      state.roomId = null;
      state.users = [];
      state.messages = [];
      state.isConnected = false;
    },

    // SOCKET CONNECTION
    setConnection: (state, action) => {
      state.isConnected = action.payload;
    },

    // USERS
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    removeUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user._id !== action.payload
      );
    },

    // MESSAGES
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // LOADING & ERROR
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setRoom,
  clearRoom,
  setConnection,
  setUsers,
  addUser,
  removeUser,
  setMessages,
  addMessage,
  setLoading,
  setError,
  clearError,
} = roomSlice.actions;

export default roomSlice.reducer;
