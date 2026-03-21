import express from 'express';
import {
  registerController,
  verifyEmailController ,
  resendEmailController,
  loginController,
  logoutController,
   getMeController,
   updateProfileController
} from "../controllers/auth.controller.js";
import { 
    registerValidator, 
     resendEmailValidator,
      loginValidator
    } from "../validators/auth.validator.js";
import identifyingUser from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.upload.js";




const authRouter = express.Router();




/**
 * @method POST
 * @description Register a new user
 * @route /api/auth/register  
 */
authRouter.post('/register', registerValidator, registerController)



/**
 * @method GET
 * @description    verify the email
 * @route         /api/auth/verify-email
 */
authRouter.get('/verify-email', verifyEmailController )



/**
 * @method         POST
 * @descritpion   resend the email
 * @route          /api/auth/resend-email
 */

authRouter.post("/resend-email", resendEmailValidator , resendEmailController )






/**
 * @method    POST
 * @description    login a registered user
 * @route     /api/auth/login
 */

authRouter.post('/login', loginValidator, loginController)






/**
 * @method    POST
 * @description logout a user
 * @route       /api/auth/logout
 */
authRouter.post("/logout" ,  logoutController)






/**
 * @method   GET
 * @descirption   fetch user profile data
 * @route       /api/auth/me
 */
authRouter.get("/me", identifyingUser , getMeController )







/**
 * @method   PATCH
 * @description user can update their profile
 * @route     /api/auth/me/profile
 */

authRouter.patch("/profile/update", identifyingUser , upload.single('avatar') ,updateProfileController )


















export default authRouter;
