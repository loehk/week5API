import mongoose from "mongoose";

export const connectionToMongo = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Connected to DB")
    } catch (error) {
        console.error(error);
    }
}

