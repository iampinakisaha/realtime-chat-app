import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3* 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge})
};


export const userSignUpController = async (req,res,next) => {
  try {
    const {email, password } = req.body

    const findUser = await User.findOne({email})

    if(findUser){
      throw new Error("Already user exist")
    }

    if (!email){
      throw new Error("Please provide email")
    }
    if (!password){
      throw new Error("Please enter password")
    }
   
    const user = await User.create({email, password});
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    
   
    res.status(201).json({
      data: {id: user.id, email: user.email, profileSetup: user.profileSetup},
      success: true,
      error: false,
      message: "User Created Successfully!"
    })

  }catch(err){
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default userSignUpController