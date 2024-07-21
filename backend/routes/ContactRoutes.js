import { Router } from "express";
import { verifyToken } from "../middleware/AuthMiddleware.js";
import searchContactsController from "../controller/contacts/ContactsController.js";


const contactsRoutes = Router();

contactsRoutes.post("/search-contact", verifyToken, searchContactsController);


export default contactsRoutes;