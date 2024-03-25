const { status } = require("init");
const Console = require("../models/console");
const { deleteFile } = require("../../utils/cloudinary/deleteFile");

const postConsole = async(req, res, next) => {
    try {
        const newConsole = new Console({
            name: req.body.name,
            imgLogo: req.body.console,
            price: req.body.price,
            videogames: req.body.videogames
        });
        if (req.file) {
            newConsole.imgLogo = req.file.path
        }

        const consoleSaved = await newConsole.save();
        return res.status(200).json(consoleSaved);

    } catch (error) {
        return res.status(400).json("Error al publicar la consola")
    }
}

const getAllConsoles = async(req, res, next) => {
    try {
        const allConsoles = await Console.find().populate("videogames");
        return res.status(200).json(allConsoles);

    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const getConsolebyId = async(req, res, next) => {
    try {
        const { id } = req.params;
        const console = await Console.findById(id).populate("videogames");
        return res.status(200).json(console);
    } catch (error) {
        return res.status(400).json("Error en la petición");
    }
}

const updateConsole = async(req, res, next) => {
    try {
        const { id } = req.params;
        const oldConsole = await Console.findById(id);
        const newConsole = new Console(req.body);
        newConsole._id = id;
        const videogames = req.body.videogames || [];
        newConsole.videogames = [...oldConsole.videogames, ...videogames];

        if (req.file) {
            newConsole.imgLogo = req.file.path;
            deleteFile(oldConsole.imgLogo);
        }
        const updateConsole = await Console.findByIdAndUpdate(id, newConsole, { new: true });
        return res.status(200).json(updateConsole);
    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al actualizar la consola");
    }
}

const deleteConsole = async(req, res, next) => {
    try {
        const { id } = req.params;
        const consoleDeleted = await Console.findByIdAndDelete(id);
        deleteFile(consoleDeleted.imgLogo);
        return res.status(200).json({
            message: "Consola eliminada correctamente",
            consoleDeleted
        })
    } catch (error) {
        return res.status(400).json("Error al eliminar la consola")
    }
}

module.exports = { postConsole, getAllConsoles, getConsolebyId, updateConsole, deleteConsole }