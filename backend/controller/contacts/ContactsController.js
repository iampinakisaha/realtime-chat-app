import User from "../../models/UserModel.js";

export const searchContactsController = async (req,res,next) => {
  try {
    const {searchTerms} = req.body;
    
    if(searchTerms === undefined || searchTerms === null) {
      return res.status(400).send("Search Term is required.")
    }

    const sanitizedSearchTerm = searchTerms.replace(
      /[.*+?^${}()|[\]\\]/g,"\\$&"
    )

    const regex = new RegExp(sanitizedSearchTerm, "i");

    const allContacts = await User.find({

      $and: [
        {_id: {$ne: req.userId}},
        {
          $or: [{ firstName: regex}, {lastName: regex}, {email: regex}],
        },
      ],
    });

    const contacts = allContacts.map((contact) => {
      return {
        id: contact._id,
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        image: contact.image,
        color: contact.color,
      };

    })
    return res.status(200).json({contacts})
  }catch(err){
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

export default searchContactsController;