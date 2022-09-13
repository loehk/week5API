import express from "express";
import { getAllGarages, getGarageByIdOrName, updateGarageByIdOrName, deleteGarageByIdOrName, getVehicles,makeGarage } from "../controllers/garageController.js";
const router = express.Router()

// Creating one
router.post('/make', makeGarage)

// Updating one by name or id
router.post('/update', updateGarageByIdOrName)

//find one by name or id
router.post('/', getGarageByIdOrName)

//find all
router.get('/', getAllGarages)

//Deleting one by name or id
router.post('/delete', deleteGarageByIdOrName)

//Deleting one by name or id
router.post('/vehicles', getVehicles)


export default router