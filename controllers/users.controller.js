const User = require("../models/users/users.model");
const role = require("../models/roles/roles.model");
const bcrypt = require("bcrypt");
const { authenticatePassword } = require("../helpers/authPassword.js");
const authenticateUser = require("../helpers/authUser.js");
const checkPermission = require("../helpers/checkPermission");
const jwt = require("jsonwebtoken");
const convertToMongooseObjectID = require("../helpers/convertToObject");

const register = async (req, res) => {
	try {
		const data = req.body;
		const existing_user = await User.findOne({ email: data.email });
		if (existing_user) {
			res.status(409).json({ message: "User already exists" });
		} else {
			data.password = await bcrypt.hash(data.password, 12);

			let user = {
				email: data.email,
				password: data.password,
				role: data.role,
				actions: data.action,
			};
			user = new User(user);
			const registeredUser = await user.save();
			if (registeredUser) {
				res.status(201).json({
					success: true,
					user: { ...user._doc, password: null, actions: null, role: null },
				});
			}
		}
	} catch (error) {
		res.status(422).json({
			success: false,
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const data = req.body;
		const user = await User.findOne({ email: data.email });

		if (!user) {
			res.status(401).json({ message: "Invalid Credentials!!" });
		} else {
			const authenticatedPassword = await authenticatePassword(
				data.password,
				user.password
			);
			if (authenticatedPassword) {
				const authUser = { id: user._id, email: user.email, role: user.role };
				const accessToken = jwt.sign(
					authUser,
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "30d",
					}
				);
				res.status(201).json({
					success: true,
					user: { ...user._doc, password: null },
					accessToken,
				});
			} else {
				res.status(401).json({ message: "Invalid Password!!" });
			}
		}
	} catch (error) {
		res.status(422).json({
			success: false,
			message: error.message,
		});
	}
};

const listUsers = async (req, res) => {
	try {
		const user = authenticateUser(User, req.user.id);
		if (user) {
			const hasPermission = await checkPermission(req.user.id, "create");

			if (hasPermission.read) {
				const users = await User.find({}, { password: 0 }).populate("role", {
					roleName: 1,
				});
				res.status(200).json({
					success: true,
					message: users,
				});
			} else {
				res.status(403).json({
					success: false,
					message: "access denied",
				});
			}
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

const deleteUser = async (req, res) => {
	try {
		const user = authenticateUser(User, req.user.id);

		if (user) {
			const hasPermission = await checkPermission(req.user.id, "delete");
			if (hasPermission.delete) {
				const users = await User.findByIdAndRemove(req.params.id);
				res.status(204).json({
					success: true,
					message: users,
				});
			} else {
				res.status(403).json({
					success: false,
					message: "access denied",
				});
			}
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

const updateUser = async (req, res) => {
	try {
		const user = authenticateUser(User, req.user.id);

		if (user) {
			const hasPermission = await checkPermission(req.user.id, "update");
			if (hasPermission.update) {
				const users = await User.findByIdAndUpdate(req.params.id, {
					actions: req.body.actions,
				});
				res.status(201).json({
					success: true,
					message: users,
				});
			} else {
				res.status(403).json({
					success: false,
					message: "access denied",
				});
			}
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

module.exports = { register, login, listUsers, deleteUser, updateUser };
