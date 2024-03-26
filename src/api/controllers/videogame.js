const { deleteFile } = require("../../utils/cloudinary/deleteFile");
const Videogame = require("../models/videogame");

const postVideogame = async(req, res, next) => {
    try {
        const newVideogame = new Videogame({
            name: req.body.name,
            frontPage: req.body.frontPage,
            backPage: req.body.backPage,
            price: req.body.price,
            description: req.body.description,
            categories: req.body.categories
        });

        if (req.files) {
            if (req.files.frontPage) {
                newVideogame.frontPage = req.files.frontPage[0].path;
            }
            if (req.files.backPage) {
                newVideogame.backPage = req.files.backPage[0].path;
            }
        }

        const videogameSaved = await newVideogame.save();
        return res.status(200).json(videogameSaved);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al crear el videojuego");
    }
}

const getAllVideogames = async(req, res, next) => {
    try {
        const allVideogames = await Videogame.find();
        return res.status(200).json(allVideogames);

    } catch (error) {
        return res.status(400).json("Error en la petición")
    }
}

const getVideogameById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const videogame = await Videogame.findById(id);
        return res.status(200).json(videogame);

    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const updateVideogame = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateVideogame = new Videogame(req.body);
        updateVideogame._id = id;
        const update = await Videogame.findByIdAndUpdate(id, updateVideogame, { new: true });
        if (req.file) {
            deleteFile(update.frontPage);
            deleteFile(update.backPage);
        }
        if (req.files) {
            if (req.files.frontPage) {
                update.frontPage = req.files.frontPage[0].path;
            }
            if (req.files.backPage) {
                update.backPage = req.files.backPage[0].path;
            }
        }
        return res.status(200).json(update);

    } catch (error) {
        return res.status(400).json("Error al actualizar el videojuego")
    }
}

const deleteVideogame = async(req, res, next) => {
    try {
        const { id } = req.params;
        const videogameDelted = await Videogame.findByIdAndDelete(id);
        deleteFile(videogameDelted.frontPage);
        deleteFile(videogameDelted.backPage);
        return res.status(200).json({
            message: "Videojuego eliminado correctamente",
            videogameDelted
        })

    } catch (error) {
        return res.status(400).json("Error al eliminar el videojuego");
    }
}

module.exports = { postVideogame, getAllVideogames, getVideogameById, updateVideogame, deleteVideogame }