const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { deleteFile } = require("../../utils/cloudinary/deleteFile");

const postUser = async(req, res, next) => {
    try {
        const { userName } = req.body;
        const userDuplicated = await User.findOne({ userName });

        if (userDuplicated) {
            return res.status(400).json("Usuario ya existente");
        }

        const newUser = new User({
            userName: req.body.userName,
            password: req.body.password,
            profileImage: req.file.path,
            rol: req.body.rol || "user",

        });

        if (req.file) {
            newUser.profileImage = req.file.path;
        }
        const userSaved = await newUser.save();
        return res.status(200).json(userSaved);

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al crear un usuario");
    }
};

const loginUser = async(req, res, next) => {
    try {
        const { userName, password } = req.body;
        const userExist = await User.findOne({ userName });
        if (userExist) {
            if (bcrypt.compareSync(password, userExist.password)) {
                const token = generateSign(userExist._id);
                return res.status(200).json({ userExist, token })
            } else {
                return res.status(400).json("Usario o contraseña incorrectossssss");
            }
        } else {
            return res.status(400).json("Usario o contraseña incorrecto");
        }

    } catch (error) {
        console.log(error);
        console.log("Error al logearse");
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(400).json("Error en la petición")
    }
}

const getUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json("Error en la petición")
    }
}

const updateUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateUser = new User(req.body);
        updateUser._id = id;
        const update = await User.findByIdAndUpdate(id, updateUser, { new: true });

        if (req.file) {
            deleteFile(update.profileImage);
        }
        if (req.file) {
            updateUser.profileImage = req.file.path;

        }

        return res.status(200).json(update);
    } catch (error) {
        return res.status(400).json("Error al actualizar el usuario");
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        deleteFile(userDeleted.profileImage);
        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            userDeleted
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json("Error al eliminar el usuario")
    }
}

module.exports = { postUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser }