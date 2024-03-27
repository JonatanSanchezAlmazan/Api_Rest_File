const User = require("../api/models/user");
const { verifyJwt } = require("../utils/jwt/jwt");


const isAuth = async(req, res, next) => {
    try {

        const token = req.headers.authorization;
        if (!token) {
            return res.status(400).json("No estas autorizado");
        }
        const [, modifiedToken] = token.split(" ");
        const { id } = verifyJwt(modifiedToken);
        const user = await User.findById(id);
        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json("No estas autorizado");
    }
}

module.exports = { isAuth }