import User from "../../models/UserModel.js";

export const userInfoController = async (req,res,next) => {
  try {
    
    const userData = await User.findById(req.userId);
    if(!userData) {
      return res.status(404).send("User with given ID not found.")
    }
    res.status(200).json({
      
        id: userData._id, 
        email: userData.email, 
        profileSetup: userData.profileSetup,
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        color:userData.color,
    })
    console.log(userData)

  }catch(err){
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default userInfoController