const mongoose = require("mongoose");

const actionSchema = mongoose.Schema(
	{
		actionType: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("actions", actionSchema);
