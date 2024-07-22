import {Router} from 'express';
import {verifyToken} from '../middleware/AuthMiddleware.js'
import messageController from '../controller/messages/MessagesController.js';

const messagesRoutes = Router ();


messagesRoutes.post("/get-messages", verifyToken, messageController);

export default messagesRoutes;