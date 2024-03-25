const mongoose = require("mongoose");

const videogameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    frontPage: { type: String, required: true },
    backPage: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categories: {
        type: String,
        required: true,
        enum: [
            "Acción",
            "Aventura",
            "Rol (RPG)",
            "Estrategia",
            "Deportes",
            "Carreras",
            "Disparos (Shooter)",
            "Supervivencia",
            "Plataforma",
            "Rompecabezas",
            "Mundo abierto",
            "Sigilo",
            "Simulación",
            "Terror",
            "Indie",
            "Multijugador en línea (MMO)",
            "Lucha",
            "Música / Ritmo",
            "Educativo",
            "Casual"
        ]
    }
}, {
    timestamps: true,
    collection: "videogames"
});

const Videogame = mongoose.model("videogames", videogameSchema, "videogames");
module.exports = Videogame;