import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const maxAge = 3* 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge})
};

export const userSignInController = async (req,res,next) => {
  try {
    const {email, password } = req.body;

    if (!email){
      return res.status(400).send("Email is required.")
    }
    if (!password){
      return res.status(400).send("Password is required.")
    }

    const findUser = await User.findOne({email})

    if(!findUser){
      return res.status(404).send("User not exist. Please signup.")
    }
    
    const validatePassword = await bcrypt.compare(password, findUser.password)
    
    if(!validatePassword) {
      return res.status(400).send("Password is incorrect.")
    }

    res.cookie("jwt", createToken(email, findUser._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    res.status(201).json({
     
        id: findUser._id, 
        email: findUser.email, 
        profileSetup: findUser.profileSetup,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        image: findUser.image,
        color:findUser.color,


      
    })

  }catch(err){
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default userSignInController