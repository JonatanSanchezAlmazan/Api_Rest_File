const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const upload = require("../../utils/cloudinary/file");
const { postConsole, getAllConsoles, getConsolebyId, updateConsole, deleteConsole } = require("../controllers/console");

const consolesRoutes = require("express").Router();

consolesRoutes.post("/register", isAdmin, upload.single("imgLogo"), postConsole);
consolesRoutes.get("/", isAuth, getAllConsoles);
consolesRoutes.get("/:id", isAuth, getConsolebyId);
consolesRoutes.put("/:id", isAdmin, upload.single("imgLogo"), updateConsole);
consolesRoutes.delete("/:id", isAdmin, deleteConsole);

module.exports = consolesRoutes;