import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name: process.env.CLONE_NAME,
        api_key: process.env.CLONE_API_KEY,
        api_secret: process.env.CLONE_API_SECRET,
    })
}

export default connectCloudinary