import express from "express";
import { getAllCars, getCarByIdOrName, updateCarByIdOrName, deleteCarByIdOrName, makeCar } from "../controllers/carController.js";
const router = express.Router()

// Creating one
router.post('/make', makeCar)

// Updating one by name or id
router.post('/update', updateCarByIdOrName)

//find one by name or id
router.post('/', getCarByIdOrName)

//find all
router.get('/', getAllCars)

//Deleting one by name or id
router.post('/delete', deleteCarByIdOrName)


export default router