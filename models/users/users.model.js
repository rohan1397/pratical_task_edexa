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
		actions: {
			create: {
				type: Boolean,
				default: false,
			},
			update: {
				type: Boolean,
				default: false,
			},
			delete: {
				type: Boolean,
				default: false,
			},
			read: {
				type: Boolean,
				default: false,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userSchema);
