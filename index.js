import express from "express";
import { connectionToMongo } from './utils/connection.js';

import CarRoutes from "./routes/carRoutes.js"
import BoatRoutes from "./routes/boatRoutes.js"
import GarageRoutes from "./routes/garageRoutes.js"


const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use(express.json());
app.use("/cars", CarRoutes);
app.use("/boats", BoatRoutes);
app.use("/garage", GarageRoutes)


app.listen(port, () => {
    connectionToMongo();
    console.log(`Example app listening on port ${port}`);
})