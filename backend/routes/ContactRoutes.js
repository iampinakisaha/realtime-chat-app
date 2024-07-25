import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import searchContactsController from "../controller/contacts/ContactsController.js";
import getContactsForDMController from "../controller/contacts/ContactsControllerForDM.js";
import getContactsForChannelController from "../controller/contacts/ContactsControllerForChannel.js";


const contactsRoutes = Router();

contactsRoutes.post("/search-contact", verifyToken, searchContactsController);
contactsRoutes.get("/get-contact-for-dm", verifyToken, getContactsForDMController);
contactsRoutes.get("/get-contact-for-channel", verifyToken, getContactsForChannelController);

export default contactsRoutes;