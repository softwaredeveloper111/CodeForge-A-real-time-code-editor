import React  from "react";
import useRoom from "../hooks/useRoom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";

const CreateRoomModal = ({ isOpen, onClose }) => {
  const { handleCreateRoom } = useRoom();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handlerSubmit = async (data) => {
    console.log(data);
    const res = await handleCreateRoom(data);

    if (res.success) {
      onClose();
      navigate("/my-rooms");
    }
  };

  const onError = (errors) => {
    if (errors.name) toast.error(errors.name.message);
    else if (errors.description) toast.error(errors.description.message);
    else if (errors.language) toast.error("Please select a language");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="w-full max-w-lg bg-[#1c253e]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Room</h2>
          <button className="cursor-pointer" onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(handlerSubmit, onError)} className="flex flex-col gap-4">

          {/* NAME */}
          <input
            placeholder="Room Name"
            {...register("name", {
              required: "Room name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
              maxLength: { value: 100, message: "Name cannot exceed 100 characters" },
              setValueAs: (v) => v.trim()
            })}
            className="px-4 py-3 rounded-xl bg-[#11192e] text-white outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            placeholder="Room Description"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 3, message: "Description must be at least 3 characters" },
              maxLength: { value: 500, message: "Description cannot exceed 500 characters" },
              setValueAs: (v) => v.trim()
            })}
            className="px-4 py-3 rounded-xl bg-[#11192e] text-white outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* LANGUAGE */}
          <select
            {...register("language", { required: true })}
            className="px-4 py-3 rounded-xl bg-[#11192e] text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          {/* BUTTON */}
          <button
            type="submit" 
            className="mt-4 py-3 rounded-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;