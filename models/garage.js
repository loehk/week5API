import mongoose, { Schema } from "mongoose";

const GarageSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    name:{
        required:true,
        type: String,
        unique:true
    },
    isUnderground: {
        type: Boolean,
        default: true
    },
    isVillainsLair:{
        default:true,
        type: Boolean,
    },
    isGuarded: {
        type: Boolean
    },
    vehiclesKept: {
        type: Schema.Types.Mixed,
        default: [{modelName:"boat", name:"Queen Liz"}]
    }
})

export default mongoose.model("Garage", GarageSchema)