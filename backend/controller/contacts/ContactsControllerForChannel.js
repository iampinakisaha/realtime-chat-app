import mongoose from "mongoose";
import User from "../../models/UserModel.js";
import Message from "../../models/MessageModel.js";

export const getContactsForChannelController = async (req, res, next) => {
  try {
    
    const users = await User.find({ _id: {$ne: req.userId}},"firstName lastName _id email");
    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value: user._id,

    }))
    return res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default getContactsForChannelController;
