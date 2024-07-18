// all the constants declared by user will be store here

export const HOST = import.meta.env.VITE_SERVER_URL; //from .env file

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const SIGNIN_ROUTE = `${AUTH_ROUTES}/signin`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;

//cloudinary image upload/delete
export const UPLOAD_IMAGE_CLOUDINARY = `${AUTH_ROUTES}/upload-image-cloudinary`;