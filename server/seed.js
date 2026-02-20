import mongoose from "mongoose";
import User from "./models/User.js";
import "dotenv/config";

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const testUser = {
            _id: "user_test123",
            username: "Test User",
            email: "test@example.com",
            Image: "https://example.com/avatar.jpg",
            role: "user",
            recentSearchedCities: []
        };

        await User.create(testUser);
        console.log("✅ Test user created successfully!");
        
        process.exit(0);
    } catch (error) {
        console.log("❌ Error:", error.message);
        process.exit(1);
    }
};

seedData();
