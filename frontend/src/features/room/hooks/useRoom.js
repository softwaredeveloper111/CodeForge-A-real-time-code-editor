import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRoomApi , joinRoomApi , UserRoomListApi ,leaveRoomApi ,getRoomApi ,deleteRoomApi} from "../services/room.api";
import {
  setRoom,
  setLoading,
  setError,
   clearRoom
} from "../room.slice";

const useRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roomId, loading, error } = useSelector((state) => state.room);

 

  const handleCreateRoom = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await createRoomApi(data);

      const roomId = response?.data?.roomId;
 

      if (!roomId) {
        throw new Error("Room ID not received");
      }

      dispatch(setRoom(roomId));
      return { success: true };

    } catch (error) {
      const message =
        error?.response?.data?.message || "Room creation failed";

      dispatch(setError(message));

      return { success: false, message };

    } finally {
      dispatch(setLoading(false));
    }
  };




const handleJoinRoom = async (roomId) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    if (!roomId) throw new Error("Room ID required");

    await joinRoomApi(roomId);

    dispatch(setRoom(roomId));
    navigate(`/room/${roomId}`);
    return { success: true };

  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Join failed";

    // ✅ Already in room → navigate anyway
    if (status === 400 && message.includes("already in the room")) {
      dispatch(setRoom(roomId));
      navigate(`/room/${roomId}`);
      return { success: true };
    }

    dispatch(setError(message));
    return { success: false, message };

  } finally {
    dispatch(setLoading(false));
  }
};



const   handleUserRoomList = async()=>{
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const response = await UserRoomListApi();
    return response.data
  } catch (error) {
   const message = error?.response?.data?.message || "Room creation failed";
   dispatch(setError(message));
   return { success: false, message };
  }finally{
     dispatch(setLoading(false));
  }
};





 const handleLeaveRoom = async (roomId)=> {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await leaveRoomApi(roomId);
    dispatch(clearRoom());
    return { success: true };
  } catch (error) {
    const message = error?.response?.data?.message || "Leave failed";
    dispatch(setError(message));
    return { success: false, message };
  }
  finally{
     dispatch(setLoading(false));
  }
};




const handledeleteRoom = async(roomId)=>{
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await deleteRoomApi(roomId);
    dispatch(clearRoom());
    return { success: true ,message:"room deleted successfuly" };
  } catch (error) {
     const message = error?.response?.data?.message || "Leave failed";
    dispatch(setError(message));
    return { success: false, message };
  }
  finally{
      dispatch(setLoading(false));
  }
}







  return {
    roomId,
    loading,
    error,
    handleCreateRoom,
    handleJoinRoom,
    handleUserRoomList,
    handleLeaveRoom,
    handledeleteRoom
  };
};

export default useRoom;