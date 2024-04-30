module.exports = app => {
    const teams = require("../controllers/team.controller.js");

    app.post("/teams", teams.validate('createTeam'), async (req, res) => {
        try {
            await teams.create(req, res);
        } catch (err) {
            res.send(err);
            console.log(err.message);
        }
    })

    // var router = require("express").Router();

    // router.post("/", teams.validate('createTeam'), teams.create);
    // router.get("/", teams.list);
    // app.use('/api/teams', router);
}