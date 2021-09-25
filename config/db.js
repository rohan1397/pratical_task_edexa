const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_CONNECTION);
const clientOption = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const db = mongoose.connect(process.env.DB_CONNECTION, clientOption);

module.exports = db;
