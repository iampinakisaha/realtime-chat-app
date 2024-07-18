import User from "../../models/UserModel.js";

export const userProfileUpdateController = async (req, res) => {
  try { 
    
    const {id} = req.body;
    const {firstName , lastName, image, color} = req.body;
    if (!firstName || !lastName) {
      return res.state(400).send("Firstname, lastname is required.");
    }
    const payload = {
      
      ... (firstName, {firstName: firstName}),
      ... (lastName, {lastName: lastName}),
      ... (image, {image: image}),
      ... (color, {color: color}),
      profileSetup: true,
    }


    const saveData = await User.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
    res.status(200).json({
      
        id: saveData._id, 
        email: saveData.email, 
        profileSetup: saveData.profileSetup,
        firstName: saveData.firstName,
        lastName: saveData.lastName,
        image: saveData.image,
        color:saveData.color,
    })
    console.log(saveData)

    
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default userProfileUpdateController