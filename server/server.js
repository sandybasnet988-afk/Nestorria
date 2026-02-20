import express from "express"
import cors from 'cors'
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

 
await connectDB();// establish connection to the database


const app = express() // initialize express application
app.use(cors()) // enables cross-origin resources sharing

//middleware setup
app.use(express.json()) // enables json request body parsing
app.use(clerkMiddleware())

//API to listen clerk webhooks
app.use("/api/clerk", clerkWebhooks)

// route endpoint to check api status
app.get('/',(req,res)=>{
    res.send("API successfully connected")
})

const port = process.env.PORT || 4000//define server port

//start the server
app.listen(port, ()=> console.log(`Server is running at http://localhost:${ port } `))


