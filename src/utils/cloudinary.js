// this file is reusable to any project
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnColudinary = async (localFilePath) => {
  try {
    if(!localFilePath) return null
    // then upload file on cloudinary
   const response = await cloudinary.uploader.upload(localFilePath , {
        resource_type: "auto"
    })
// file upload successfull
    console.log( 'file upload successfull ' , response.url)
    return response

  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload option failed
    return null 
  }
};

export default uploadOnColudinary

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
