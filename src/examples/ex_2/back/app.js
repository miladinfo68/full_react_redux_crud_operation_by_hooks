const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 7000;

const app = express();

//clien app
var corsOptions = { origin: "http://localhost:4000" };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

require("./config/dbConf.js");

// require("./routes/common-routes.js")(app);
require("./routes/tutorialRoute.js")(app);

//not found route
app.use((req, res) => {
  res.status(404).send({ "url ": `${req.originalUrl} was not found` });
});

app.listen(port, () => {
  console.log("Server is running in port of " + port);
});

module.exports = app;