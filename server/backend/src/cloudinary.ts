import { v2 as cloudinary } from "cloudinary";
import fs, { unlinkSync } from "fs";
import { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_API_SECRET } from "../config/config";

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(loaclFilePath: string) => {
    try{
        if(!loaclFilePath) return null;

        const response = await cloudinary.uploader.upload(loaclFilePath, {
          resource_type: "auto",
        });
        return response;
    }catch(error){
        fs.unlinkSync(loaclFilePath);
        return null;
    }
}

export {uploadOnCloudinary};