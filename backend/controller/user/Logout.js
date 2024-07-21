
export const userLogoutController = async (req,res,next) => {
  try {
    res.cookie("jwt", "", {maxAge: 1, secure: true, sameSite:"None"});
    res.status(200).send("Logout successfull.");
  }catch(err){
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default userLogoutController;