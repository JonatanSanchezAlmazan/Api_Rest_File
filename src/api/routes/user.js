const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const upload = require("../../utils/cloudinary/file");
const { postUser, loginUser, getAllUsers, deleteUser, getUserById, updateUser } = require("../controllers/user");

const usersRoutes = require("express").Router();

usersRoutes.post("/register", upload.single("profileImage"), postUser);
usersRoutes.post("/login", loginUser);
usersRoutes.get("/", isAdmin, getAllUsers);
usersRoutes.get("/:id", isAdmin, getUserById);
usersRoutes.put("/:id", isAuth, upload.single("profileImage"), updateUser);
usersRoutes.delete("/:id", isAdmin, deleteUser);

module.exports = usersRoutes;