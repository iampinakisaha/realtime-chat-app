import { toast } from "sonner";
import apiClient from "../api-client";
import { UPLOAD_IMAGE_CLOUDINARY } from "@/utils/constants";


const uploadImage = async (image, folder) => {
  
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "realtime_chat");
  formData.append("folder", folder);

 

  try {
    const response = await apiClient.post(UPLOAD_IMAGE_CLOUDINARY, formData, { withCredentials: true },);
    
    if (response.status === 200 && response.data.secure_url) {
      return response;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
  
    toast.error("Failed to upload image");
    throw error; // Propagate the error further if needed
  }
};

export default uploadImage;
