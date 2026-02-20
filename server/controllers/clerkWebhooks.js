import { Webhook } from "svix";
import User from "../models/User.js";
import { json } from "express";
import { Message } from "svix/dist/api/message.js";

const clerkWebhooks = async (req,res)=>{
    try {
        // create a svix instance
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        // get headers
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        //verifying Headers
        await whook.verify(JSON.stringify(req.body), headers)

        //getting data from request body
        const {data, type} = req.body
        
        // switch case reference
        switch (type) {
            case "user.created":{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_addresses,
                    username: data.first_name + " " + data.last_name,
                    image:data.image_url,
                };
                await User.create(userData)
                break;
            }
             case "user.updated":{
                const userData = {
                    _id:data.id,
                    email: data.email_addresses[0].email_addresses,
                    username: data.first_name + " " + data.last_name,
                    image:data.image_url,
                };
                await User.findByIdAndupdate(data.id, userData)
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