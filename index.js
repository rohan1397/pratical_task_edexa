const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT);
console.log(`Server ready at http://localhost:${process.env.PORT}/api`);
