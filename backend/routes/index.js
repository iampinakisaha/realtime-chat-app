import { Router } from "express";
import { userSignUpController } from "../controller/user/Signup.js";
import userSignInController from "../controller/user/Signin.js";
import userInfoController from "../controller/user/GetUserInfo.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import userProfileUpdateController from "../controller/user/UpdateProfile.js";
import uploadCloudinaryImageController from "../controller/cloudinary/cloudinaryImageUpload.js";


const authRouter = Router();

authRouter.post("/signup", userSignUpController);
authRouter.post("/signin", userSignInController);
authRouter.get("/user-info",verifyToken, userInfoController);
authRouter.post("/update-profile",verifyToken, userProfileUpdateController);


//cloudinary image controller
authRouter.post("/upload-image-cloudinary", verifyToken, uploadCloudinaryImageController);
export default authRouter;