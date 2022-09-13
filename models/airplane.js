import mongoose from "mongoose";

const AirplaneSchema = new mongoose.Schema({
    make: {
        required: true,
        type: String
    },
    name:{
        required:true,
        type: String,
        unique:true
    },
    usageType: {
        type: String,
        required: true,
    },
    engineType: {
        required: true,
        type: String
    },
    maxSpeed: {
        required: true,
        type: Number
    },
    canFly: {
        type: Boolean,
        default: true,
    },
    hasRockets: {
        default: false,
        type: Boolean,
    },
    isLuxury: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Airplane", AirplaneSchema)