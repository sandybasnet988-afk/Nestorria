import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"
import userRouter from "./routes/userRoute.js"
import agencyRouter from "./routes/agencyRoute.js"
import User from "./models/User.js"


 
await connectDB();// establish connection to the database


const app = express() // initialize express application
app.use(cors()) // enables cross-origin resources sharing

//API to listen clerk webhooks - MUST be before express.json() and clerkMiddleware
app.post("/api/clerk", express.raw({type: 'application/json'}), clerkWebhooks)

//define API routes
app.use('/api/user', userRouter)
app.use('/api/agencies', agencyRouter)

//middleware setup
app.use(express.json()) // enables json request body parsing
app.use(clerkMiddleware())

// route endpoint to check api status
app.get('/',(req,res)=>{
    res.send("API successfully connected")
})

// Manual user creation endpoint (for testing without webhook)
app.post("/api/user/create", async (req, res) => {
    try {
        const { id, email, firstName, lastName, imageUrl } = req.body;
        const userData = {
            _id: id,
            email: email,
            username: firstName + " " + lastName,
            Image: imageUrl,
            role: "user",
            recentSearchedCities: []
        };
        await User.create(userData);
        res.json({ success: true, message: "User created" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
})

const port = process.env.PORT || 4000//define server port

//start the server
app.listen(port, ()=> console.log(`Server is running at http://localhost:${ port } `))


