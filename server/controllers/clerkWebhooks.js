import { Webhook } from "svix";
import User from "../models/User.js";
import { json } from "express";
import { Message } from "svix/dist/api/message.js";

const clerkWebhooks = async (req,res)=>{
    try {
        console.log("📩 Webhook received");
        
        // create a svix instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        // get headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        // Get raw body (req.body is a Buffer when using express.raw)
        const payload = req.body.toString();
        
        //verifying Headers
        await whook.verify(payload, headers)

        // Parse the body
        const body = JSON.parse(payload);
        const {data, type} = body
        
        console.log("📩 Event type:", type);
        
        // switch case reference
        switch (type) {
            case "user.created":{
                console.log("👤 Creating user:", data.id);
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    Image:data.image_url,
                    role: "user",
                    recentSearchedCities: []
                };
                await User.create(userData)
                console.log("✅ User created successfully!");
                break;
            }
             case "user.updated":{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    Image:data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData)
                break;
            }
             case "user.deleted":{
              
                await User.findByIdAndDelete(data.id)
                break;
            }
            default:
                break;
        }
        res.json({success:true, message: "Webhook Received"})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message: error.message})
    }
};

export default clerkWebhooks
