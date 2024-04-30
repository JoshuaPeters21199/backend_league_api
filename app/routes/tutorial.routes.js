module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.validate('createTutorial'),tutorials.create);
    router.get("/", tutorials.list);
    app.use('/api/tutorials', router);
  };