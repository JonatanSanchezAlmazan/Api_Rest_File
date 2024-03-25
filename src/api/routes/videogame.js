const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const upload = require("../../utils/cloudinary/file");
const { postVideogame, getAllVideogames, getVideogameById, updateVideogame, deleteVideogame } = require("../controllers/videogame");

const videogamesRoutes = require("express").Router();

videogamesRoutes.post("/register", isAdmin, upload.fields([{ name: "frontPage" }, { name: "backPage" }]), postVideogame);
videogamesRoutes.get("/", isAuth, getAllVideogames);
videogamesRoutes.get("/:id", isAuth, getVideogameById);
videogamesRoutes.put("/:id", isAdmin, updateVideogame);
videogamesRoutes.delete("/:id", isAdmin, deleteVideogame);

module.exports = videogamesRoutes;