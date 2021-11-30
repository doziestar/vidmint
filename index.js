const logger = require("./src/startups/logging");
const express = require("express");
const app = express();

require("./src/startups/logging");
require("./src/startups/config")();
require("./src/startups/routes")(app);
require("./src/startups/db")();

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`listening on port ${port}`));
