import { Router } from "express";
import identifyingUser  from "../middlewares/auth.middleware.js";
import { createRoomController ,joinRoomController ,getRoomController ,leaveRoomController ,deleteRoomController ,getMyRoomsConroller } from "../controllers/room.controller.js";
import { roomCreateValidation } from "../validators/room.validator.js";



const roomRouter = Router();







/**
 * @method    POST
 * @route     /api/room
 * @description   user can create a new room
 */

roomRouter.post("/" , roomCreateValidation , identifyingUser , createRoomController )



/**
 * @method   POST
 * @route     /api/room/join/:roomId
 * @description   user can join a room
 */
roomRouter.post("/join/:roomId", identifyingUser , joinRoomController);





/**
 * @method   GET
 * @route    /api/room/my/rooms
 * @description   user can get all his rooms
 */
roomRouter.get("/my/rooms", identifyingUser, getMyRoomsConroller);






/**
 * @method   GET
 * @route     /api/room/:roomId
 * @description   user can get a room details
 */
roomRouter.get("/:roomId", identifyingUser, getRoomController);





/**
 * @method   PUT
 * @route     /api/room/leave/:roomId
 * @description   user can leave a room
 */
roomRouter.put("/leave/:roomId",identifyingUser, leaveRoomController);





/**
 * @method   DELETE
 * @route    /api/room/shutdown/:roomId
 * @description   only admin can delete the room (who created)
 */

roomRouter.delete("/shutdown/:roomId", identifyingUser ,deleteRoomController )











export default roomRouter