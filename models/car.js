import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    make: {
        required: true,
        type: String
    },
    name:{
        required:true,
        type: String,
        unique:true
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        required: true,
        type: String
    },
    color: {
        required: true,
        type: String
    },
    type: {
        type: String,
        required: true,
    },
    canFly: {
        type: Boolean,
        default: false,
    },
    previousOwners: {
        type: [String],
    },
    isLuxury: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Car", CarSchema)