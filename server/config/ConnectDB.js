import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database successfully!");
    } catch (error) {
        console.log("Error in connecting to database", error.message);   
    }
}

export default ConnectDB;