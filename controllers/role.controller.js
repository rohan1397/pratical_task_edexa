const authenticateUser = require("../helpers/authUser");
const role = require("../models/roles/roles.model");
const User = require("../models/users/users.model");

const listRoles = async (req, res) => {
	try {
		const user = authenticateUser(User, req.user.id);
		if (user) {
			const roles = await role.find({}, { roleName: 1 });
			res.status(200).json({
				success: true,
				message: roles,
			});
		} else {
			res.status(404).json({
				success: false,
				message: "not found user",
			});
		}
	} catch (error) {
		res.status(422).json({
			success: false,
			message: error.message,
		});
	}
};
module.exports = { listRoles };
