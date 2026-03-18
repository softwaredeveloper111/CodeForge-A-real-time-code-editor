import { Router } from "express";
import identifyingUser  from "../middlewares/auth.middleware.js";
import { runCodeController } from "../controllers/code.controller.js";



const codeRouter = Router();





/**
 * @method   POST
 * @route     /api/code/run
 * @description   user can run a code
 */
codeRouter.post("/run" , identifyingUser , runCodeController)







export default codeRouter;