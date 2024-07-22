import Message from "../../models/MessageModel.js";
import User from "../../models/UserModel.js";

export const messageController = async (req, res, next) => {
  console.log("request received at backend")
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).send("Both user ID's are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({timestamp: 1});


    return res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default messageController;
