import { v2 as cloudinary } from 'cloudinary';

export const deleteCloudinaryImageController = async (req, res, next) => {
  try {
   
    const { public_id } = req.body;
  

    if (!public_id) {
      return res.status(400).json({
        message: "Public ID is required",
        error: true,
        success: false,
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);
   

    if (result.result === "ok") {
      return res.status(200).json({
        data: result,
        message: "Image Deleted Successfully.",
        error: false,
        success: true,
      });
    } else if (result.result === "not found") {
      return res.status(404).json({
        data: result,
        message: "Image not found.",
        error: true,
        success: false,
      });
    } else {
      return res.status(500).json({
        data: result,
        message: "An error occurred while deleting the image.",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default deleteCloudinaryImageController;
