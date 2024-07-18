const cloudinary = require('cloudinary').v2;

async function deleteCloudinaryImageController (req, res) {

  try {
    console.log("request", req.body)
    const { public_id } = req.body;
    
    const {result} = await cloudinary.uploader.destroy(public_id);
    console.log("result is", result)
  
    if (result === "ok") {
      res.status(200).json({
        data: result,
        message: "Image Deleted Successfully.",
        error: false,
        success: true,
      });
    } else {
      throw new Error("Image Not Found.")
    }

  } catch(err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteCloudinaryImageController