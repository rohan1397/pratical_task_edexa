const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "roles",
			required: true,
		},
		actions: [
			{
				type: mongoose.Schema.Types.ObjectID,
				ref: "actions",
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userSchema);
