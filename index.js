require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const { connectDB } = require("./src/config/db");
const usersRoutes = require("./src/api/routes/user");
const videogamesRoutes = require("./src/api/routes/videogame");
const consolesRoutes = require("./src/api/routes/console");

const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


connectDB();
app.use(express.json());

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/videogames", videogamesRoutes);
app.use("/api/v1/consoles", consolesRoutes)



app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
})

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
})