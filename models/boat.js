import mongoose from "mongoose";

const BoatSchema = new mongoose.Schema({
    canFloat: {
        type: Boolean,
        default: true,
    },
    make: {
        required: true,
        type: String,
    },
    name:{
        required:true,
        type: String,
        unique:true
    },
    type: {
        required: true,
        type: String,
    },
    canFly: {
        type: Boolean,
        default: false,
    },
    isLuxury: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model("Boat", BoatSchema)