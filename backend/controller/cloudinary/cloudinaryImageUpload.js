import { v2 as cloudinary } from 'cloudinary'; //beacuse of this URL not proper was not able to upload in specific paths
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // Adjust as necessary for file storage

export const uploadCloudinaryImageController = async (req, res, next) => {
 
  try {
    // Use multer to parse the multipart/form-data
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).send("Unexpected error while uploading the file.");
      }
      
      const { folder } = req.body;
    
      
      if (!req.file || !folder) {
        throw new Error("Missing required parameters - file or folder");
      }

      // Upload the image to Cloudinary with the folder specified
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: folder
      });


      // Check if upload was successful
      if (result && result.secure_url) {
        res.status(200).json(result);
      } else {
        throw new Error("Image upload failed.");
      }
    });
  } catch (error) {
   
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadCloudinaryImageController;
