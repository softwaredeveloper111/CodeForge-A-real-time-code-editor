import {Router} from "express";
import identifyingUser  from "../middlewares/auth.middleware.js";
import  {getMessagesController} from "../controllers/message.controller.js"





const messageRouter = Router();





/**
 * @method    GET
 * @route     /api/messages/:roomId
 * @description   get all the chat messages in a room
 */
messageRouter.get("/:roomId", identifyingUser , getMessagesController )









export default messageRouter