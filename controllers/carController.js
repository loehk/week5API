import Cars from "../models/car.js"


export const makeCar = async (req, res) => {
    console.log(req.body);
    const { make, model, year, color, type, name, canFly, previousOwners } = req.body;

    if (!make || !model || !year || !color || !type || !name) {
        return res.status(400).json({ error: "Please make sure to have a car make, model, year color, type and name" });
    }

    try {
        const { name, _id } = req.body;
        const existingCar = await findCarByNameOrId(name, _id)
        if (existingCar) {
            return res.status(400).json({message:"Duplicate car"})
        }
        const newCar = new Cars({ make, model, year, color, type, name, canFly, previousOwners });

        newCar.save()
        res.status(201).json({ message: `Enjoy your brand new ${make} car = ${name}` });
    } catch (err) {
        res.send(err);
    }
};

// export const getCarById = async (req, res, next) => {
//     try {
//         const car = await Cars.findById(req.body._id)
//         if (car == null) {
//             return res.status(404).json({ message: 'Cannot find car' })
//         } else {
//             return res.status(200).json(car)
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
// }

// export const getCarByName = async (req, res, next) => {

// }
// try {
//     const car = await Cars.findOne({ name: req.body.name })
//     if (car == null) {
//         return res.status(404).json({ message: 'Cannot find car' })
//     } else {
//         return res.status(200).json(car)
//     }
// } catch (err) {
//     return res.status(500).json({ message: err.message })
// }


export const getCarByIdOrName = async (req, res, next) => {
    const { name, _id } = req.body;
    let car = await findCarByNameOrId(name, _id);
    if (car == null) {
        return res.status(404).json({ message: 'Cannot find car' })
    } else {
        return res.status(200).json(car)
    }
}


export const updateCarByIdOrName = async (req, res) => {
    const { name, _id } = req.body;
    let car = await findCarByNameOrId(name, _id);
    if (car == null) {
        return res.status(404).json({ message: 'Cannot find car' })
    } else {
        try {
            const { make, model, year, color, type, name, canFly, previousOwners } = req.body;
            make && (car.make = make)
            model && (car.model = model);
            color && (car.color = color);
            type && (car.type = type);
            name && (car.name = name);
            canFly && (car.canFly = canFly);
            previousOwners && (car.previousOwners = previousOwners);
            year && (car.year = year);

            car.save()

        } catch (error) {
            res.status(500).json(error)

        }
        return res.status(200).json(car)
    }

};

export const getAllCars = async (req, res) => {

    try {
        const cars = await Cars.find()
        res.json(cars)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteCarByIdOrName = async (req, res) => {
    const { name, _id } = req.body;
    let car = await findCarByNameOrId(name, _id);
    try {
        car.delete()
        res.status(200).json({ message: "Car has been sold" });
    } catch (err) {
        res.send(err);
    }
};

export async function findCarByNameOrId(name, _id) {
    let car = null;
    try {
        car = await Cars.findById(_id);
    } catch (error) {
        car = null;
    }


    if (!car) {
        try {
            car = await Cars.findOne({ name: name });
        } catch (error) {
            car = null;
        }
    }
    return car;
}

