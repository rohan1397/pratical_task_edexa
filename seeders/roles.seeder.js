var seeder = require("mongoose-seed");
require("dotenv").config();
seeder.connect(process.env.DB_CONNECTION, function () {
	// Load Mongoose models
	seeder.loadModels(["models/roles/roles.model.js"]);

	// Clear specified collections
	seeder.clearModels(["roles"], function () {
		// Callback to populate DB once collections have been cleared
		seeder.populateModels(roles, function () {
			seeder.disconnect();
		});
	});
});

// Data array containing seed data - documents organized by Model
var roles = [
	{
		model: "roles",
		documents: [
			{
				roleName: "HR",
			},
			{
				roleName: "Manager",
			},
			{
				roleName: "Team Lead",
			},
			{
				roleName: "Employee",
			},
		],
	},
];
