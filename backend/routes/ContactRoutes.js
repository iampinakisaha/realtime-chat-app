import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import searchContactsController from "../controller/contacts/ContactsController.js";
import getContactsForDMController from "../controller/contacts/ContactsControllerForDM.js";


const contactsRoutes = Router();

contactsRoutes.post("/search-contact", verifyToken, searchContactsController);
contactsRoutes.get("/get-contact-for-dm", verifyToken, getContactsForDMController);

export default contactsRoutes;