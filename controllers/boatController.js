import Boats from "../models/boat.js"


export const makeBoat = async (req, res) => {
    console.log(req.body);

    const { canFloat, make, name, type, canFly } = req.body;

    if (!make || !name || !type) {
        return res.status(400).json({ error: "Please make sure to have a boat canFloat, make, name, type" });
    }

    try {
        const { name, _id } = req.body;
        const existingBoat = await findBoatByNameOrId(name, _id)
        if (existingBoat) {
            return res.status(400).json({message:"Duplicate car"})
        }
        const newBoat = new Boats({ canFloat, make, name, type, canFly });

        newBoat.save()
        res.status(201).json({ message: `Enjoy your brand new ${make} boat = ${name}` });
    } catch (err) {
        res.send(err);
    }
};


export const getBoatByIdOrName = async (req, res, next) => {
    const {name, _id} = body.req
    let boat = await findBoatByNameOrId(name, _id);
    if (boat == null) {
        return res.status(404).json({ message: 'Cannot find boat' })
    } else {
        return res.status(200).json(boat)
    }
}


export const updateBoatByIdOrName = async (req, res) => {
    let boat = await findBoatByNameOrId(name, _id);
    if (boat == null) {
        return res.status(404).json({ message: 'Cannot find boat' })
    } else {
        try {
            const { canFloat, make, name, type, canFly } = req.body;
            canFloat && (boat.canFloat = canFloat)
            name && (boat.name = name)
            type && (boat.type = type)
            canFly && (boat.canFly = canFly)
            make && (boat.make = make)

            boat.save()

        } catch (error) {
            res.status(500).json(error)

        }
        return res.status(200).json(boat)
    }

};

export const getAllBoats = async (req, res) => {

    try {
        const boats = await Boats.find()
        console.log(boats)
        res.json(boats)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteBoatByIdOrName = async (req, res) => {
    const {name, _id} = body.req
    let boat = await findBoatByNameOrId(name, _id);
    try {
        boat.delete()
        res.status(200).json({ message: "Boat has been sold" });
    } catch (err) {
        res.send(err);
    }
};
export async function findBoatByNameOrId(name, _id) {
    let boat = null;
    try {
        boat = await Boats.findById(_id);
    } catch (error) {
        boat = null;
    }


    if (!boat) {
        try {
            boat = await Boats.findOne({ name: name });
        } catch (error) {
            boat = null;
        }
    }
    return boat;
}

