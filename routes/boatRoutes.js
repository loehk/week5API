import express from "express";
import { getAllBoats, getBoatByIdOrName, updateBoatByIdOrName, deleteBoatByIdOrName, makeBoat } from "../controllers/boatController.js";
const router = express.Router()

// Creating one
router.post('/make', makeBoat)

// Updating one by name or id
router.post('/update', updateBoatByIdOrName)

//find one by name or id
router.post('/', getBoatByIdOrName)

//find all
router.get('/', getAllBoats)

//Deleting one by name or id
router.post('/delete', deleteBoatByIdOrName)


export default router