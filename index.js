const express = require("express");
const movies = require("./src/routes/movies");
const pages = require("./src/routes/pages");

const app = express();

app.use(express.json());
app.use("/api/genres", movies);
app.use("/", pages);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
