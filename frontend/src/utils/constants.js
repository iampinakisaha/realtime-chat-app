// all the constants declared by user will be store here

export const HOST = import.meta.env.VITE_SERVER_URL; //from .env file

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;

//cloudinary image upload/delete
export const UPLOAD_IMAGE_CLOUDINARY = `${AUTH_ROUTES}/upload-image-cloudinary`;
export const DELETE_IMAGE_CLOUDINARY = `${AUTH_ROUTES}/delete-image-cloudinary`;


//contact search
export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search-contact`;
export const GET_CONTACT_DM_ROUTES = `${CONTACTS_ROUTES}/get-contact-for-dm`;
export const GET_CONTACT_CHANNEL_ROUTES = `${CONTACTS_ROUTES}/get-contact-for-channel`;

// get messages
export const MESSAGES_ROUTES = "api/messages";
export const GET_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;
export const UPDATE_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/update-messages`;


//channel
export const CHANNEL_ROUTES = "api/channels";
export const CREATE_CHANNEL_ROUTES = `${CHANNEL_ROUTES}/create-channel`;
export const GET_USER_CHANNELS_ROUTES = `${CHANNEL_ROUTES}/get-user-channels`;
export const GET_CHANNEL_MESSAGES_ROUTES = `${CHANNEL_ROUTES}/get-channel-messages`;