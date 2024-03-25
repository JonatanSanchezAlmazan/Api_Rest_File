const mongoose = require("mongoose");

const consoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imgLogo: { type: String, required: true },
    price: { type: Number, required: true },
    videogames: [{ type: mongoose.Types.ObjectId, ref: "videogames", required: false }]
}, {
    timestamps: true,
    collection: "consoles"
});

const Console = mongoose.model("consoles", consoleSchema, "consoles");
module.exports = Console;