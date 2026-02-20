import { MongoClient } from "mongodb";

const connectDB = async ()=>{
    try {
        console.log("Connecting to MongoDB...");
        
        const client = new MongoClient(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
            maxPoolSize: 10,
            minPoolSize: 5,
        });
        
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Database connected successfully");
        return client;
    } catch (error) {
        console.log("❌ Database connection failed");
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error code:", error.code);
        
        if (error.message.includes('querySrv')) {
            console.log("\n💡 DNS Lookup Failed - Try these solutions:");
            console.log("   1. Change your DNS to Google DNS (8.8.8.8) or Cloudflare (1.1.1.1)");
            console.log("   2. Use a VPN");
            console.log("   3. Get the direct connection string from MongoDB Atlas:");
            console.log("      - Go to Atlas → Database → Connect → Drivers → Node.js");
            console.log("      - Select 'Version 2.2.12 or later' for the older connection string format");
        } else if (error.code === 'ECONNREFUSED') {
            console.log("\n💡 Connection Refused - Check:");
            console.log("   1. IP Whitelist in MongoDB Atlas");
            console.log("   2. Windows Firewall settings");
            console.log("   3. Internet connection");
        }
        process.exit(1);
    }
}
export default connectDB;
