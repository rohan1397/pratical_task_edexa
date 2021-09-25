const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
	{
		roleName: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("roles", roleSchema);
