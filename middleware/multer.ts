// const path = require("path");
// const multer = require("multer");
import multer from "multer";
const cloudinary = require("cloudinary").v2
import {CloudinaryStorage} from "multer-storage-cloudinary"




cloudinary.config({
    cloud_name: process.env.MY_CLOUDINARY_NAME,
    api_key: process.env.MY_API_KEY,
    api_secret: process.env.MY_API_SECRET

})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "SHOPRITE",        
        }
    }
});

export const upload = multer({ storage: storage })