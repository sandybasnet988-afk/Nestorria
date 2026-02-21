import express from "express"
import { authUser } from "../middleware/authMiddleware.js"
import { addRecentsearchCity, getUserProfile } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get('/', authUser, getUserProfile)
userRouter.get('/store-recent-search', authUser, addRecentsearchCity)

export default userRouter
