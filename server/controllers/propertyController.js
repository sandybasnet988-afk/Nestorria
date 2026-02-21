 import {v2 as cloudinary} from "cloudinary"
 import Agency from "../models/Agency.js"
 import Property from "../models/Property.js"
import { Message } from "svix/dist/api/message";
import { populate } from "dotenv";

 // create a new property [post'/properties']
 export const createNewProperty = async(req,res)=>{
    try {
        const{title, description, city, country,address, area, propertyType,priceRent,priceSale,bedrooms, bathrooms, garages, amenities,}=req.body;

        const agency = await Agency.findOne({owner: req.auth.userId})
        if(!agency){
            return res.json({success: false,Message: "Agency not found"})

        }

        // upload image to cloudinary
        
        const uploadImages = req.files.map(async (file) =>{
            const response = await cloudinary.uploader.upload(file.path)
            return response.secure_url
        })
        // waiting for uploads to complete
        const images = await Promise.all(uploadImages)
        await Property.create({ agency: agency._id,
            title, description, city, country,address, area, propertyType,price:{
                rent: priceRent ? + priceRent : null,
                sale: priceSale ? + priceSale : null,
            },
              facilities:{
        bedrooms:+bedrooms,
        bathrooms:+bathrooms,
        garages:+garages,
    },
             amenities: JSON.parse(amenities),
             images,
        });


        res.json({success:true, Message: "Property Created"})
        
    } catch (error) {

        res.json({success:false, Message: error.Message})
        
    }
 };

 // get all available properties [get /properties]

 export const getAllAvailableProperties = async (req,res)=>{
    try {
        const properties = await Property.find({isAvailable: true}).populated({
            path:"agency",
            populate:{
                path:"owner",
                select: "image email",
            },
        });

        res.json({success: true,properties})
    } catch (error) {
        res.json({success: false, Message: error.Message})
        
    }
 };

 // get properties of the logged in agency/owner [get "/properties/owner"]
 export const getOwnerProperties = async (req,res)=>{
    try {
        const agencyData = await Agency.findOne({owner:req.auth.userId});
        const properties = await Property.find({
            agency: agencyData._id.toString(),
        }).populate("agency");
        res.json({success: true,properties});
    } catch (error) {
        res.json({success: false, Message: error. message});

        
    }
 };
     
 // toggle avaolable status of a property [post "/properties/toggle-availability"]
 export const togglePropertyAvailability = async (req,res)=>{
    try {
        const {propertyId} = req.body
        const propertyData = await Property.findById(propertyId)
        propertyData.isAvailable = !propertyData.isAvailable
        await propertyData.save()

        ews.json({success:true, Message:"status Updated"})
    } catch (error) {
        res.json({success: false, Message: error. message});
    }
 }