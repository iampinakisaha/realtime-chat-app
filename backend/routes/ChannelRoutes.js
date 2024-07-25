import {Router} from 'express';
import {verifyToken} from '../middleware/AuthMiddleware.js'
import channelController, { getChannelMessages, getUserChannels } from '../controller/messages/ChannelController.js';

const channelRoutes = Router ();


channelRoutes.post("/create-channel", verifyToken, channelController);
channelRoutes.get("/get-user-channels", verifyToken, getUserChannels);
channelRoutes.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages);


export default channelRoutes;