const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ken's Tutorial application." });
  });
  
  require("./app/routes/tutorial.routes.js")(app);
  require("./app/routes/team.routes.js")(app);
  
  // set port, listen for requests
  // const PORT = process.env.PORT || 8085;
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });