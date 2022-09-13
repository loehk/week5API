import Garages from "../models/garage.js"
import { findBoatByNameOrId } from "./boatController.js";
import { findCarByNameOrId, getCarByIdOrName } from "./carController.js";


export const makeGarage = async (req, res) => {
    console.log(req.body);


    const { place, name, isUnderground, isVillainsLair, isGuarded, vehiclesKept } = req.body;

    if (!place || !name) {
        return res.status(400).json({ error: "Please make sure to have a garage place, name" });
    }

    try {
        const { name, _id } = req.body;
        const existingGarage = await findGarageByNameOrId(name, _id)
        if (existingGarage) {
            return res.status(400).json({message:"Duplicate garage"})
        }
        const newGarage = new Garages({ place, name, isUnderground, isVillainsLair, isGuarded, vehiclesKept });

        newGarage.save()
        res.status(201).json({ message: `Enjoy your brand new ${name} garage in ${place}` });
    } catch (err) {
        res.send(err);
    }
};


export const getGarageByIdOrName = async (req, res, next) => {
    const { name, _id } = req.body;
    let garage = await findGarageByNameOrId(name, _id);
    if (garage == null) {
        return res.status(404).json({ message: 'Cannot find garage' })
    } else {
        return res.status(200).json(garage)
    }
}

export const getVehicles = async(req, res, next)=>{
    const { name, _id } = req.body;
    let garage = await findGarageByNameOrId(name, _id);
    if(garage==null){
        return res.status(404).json({message: 'cannot find garage'});
    }else{
        try{
            const vehicles = garage.vehiclesKept;
            const cars = vehicles.filter(vehicle=>vehicle.type==="car");
            const boat = vehicles.filter(vehicle=>vehicle.type==="boat");
            const allCarsInGarage = await Promise.all(cars.map(async (car)=>{
                return await findCarByNameOrId(car.name, car.id);
            }))
            const allBoatsInGarage = await Promise.all(boat.map(async (boat)=>{
                return await findBoatByNameOrId(boat.name, boat.id);
            }))
            console.log(allBoatsInGarage)
            const allVehicles = [...allCarsInGarage, ...allBoatsInGarage]
        
            return res.status(200).json(allVehicles)
        }catch(error){
            return res.status(500).json({message:'Whoops', error:error})
        }
    }
}


export const updateGarageByIdOrName = async (req, res) => {
    const { name, _id } = req.body;
    let garage = await findGarageByNameOrId(name, _id);
    if (garage == null) {
        return res.status(404).json({ message: 'Cannot find garage' })
    } else {
        try {
            const { place, name, isUnderground, isVillainsLair, isGuarded, vehiclesKept } = req.body;
            place && (garage.place = place)
            name && (garage.name = name)
            isUnderground && (garage.isUnderground = isUnderground)
            isVillainsLair && (garage.isVillainsLair = isVillainsLair)
            isGuarded && (garage.isGuarded = isGuarded)
            vehiclesKept && (garage.vehiclesKept = vehiclesKept)

            garage.save()

        } catch (error) {
            res.status(500).json(error)

        }
        return res.status(200).json(garage)
    }

};

export const getAllGarages = async (req, res) => {

    try {
        const garages = await Garages.find()
        res.json(garages)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteGarageByIdOrName = async (req, res) => {
    const { name, _id } = req.body;
    let garage = await findGarageByNameOrId(name, _id);
    try {
        garage.delete()
        res.status(200).json({ message: "Garage has been sold" });
    } catch (err) {
        res.send(err);
    }
};
async function findGarageByNameOrId(name, _id) {
    let garage = null;
    try {
        garage = await Garages.findById(_id);
    } catch (error) {
        garage = null;
    }


    if (!garage) {
        try {
            garage = await Garages.findOne({ name: name });
        } catch (error) {
            garage = null;
        }
    }
    return garage;
}

