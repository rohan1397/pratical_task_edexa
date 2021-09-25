const User = require("../models/users/users.model");
const convertToMongooseObjectID = require("./convertToObject");
const checkPermission = async (id, permission) => {
	const user = await User.findOne({ _id: await convertToMongooseObjectID(id) });
	return user.actions;
};
module.exports = checkPermission;
