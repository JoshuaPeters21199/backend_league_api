const Team = require("../models/team.model.js");
const { body, validationResult } = require('express-validator');

exports.validate = (method) => {
    let rules = [
        body('name', 'name cannot be empty').not().isEmpty().trim().escape(),
        body('notes').trim().escape(),
        body('coach_id', 'coach_id cannot be empty').not().isEmpty().trim().escape(),
        body('league_id', 'league_id cannot be empty').not().isEmpty().trim().escape(),
        body('motto').trim().escape()
    ]
    switch (method) {
        case 'updateTeam':
            return rules;
        case 'createTeam': {
            let createRules = [...rules];
            createRules.push(
                body('name').custom(async (value) => {
                    return await Team.checkDuplicateName(value);
                })
            )
            return createRules;
        }
    }
}

exports.create = async(req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
        return false;
    }

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return false;
    }

    const team = new Team({
        name: req.body.name,
        coach_id: req.body.coach_id,
        league_id: req.body.league_id,
        notes: req.body.notes,
        motto: req.body.motto
    });

    try {
        let result = await Team.create(team);
        res.status(201).send(result);
    } catch (err) {
        throw(err);
    }
}

exports.list = async (req, res) => {
    const params = {
        sortCol: req.query.sortCol || "name",
        sortDir: req.query.sortDir || "asc",
        filterStr: req.query.filterStr || "",
        filterCol: req.query.filterCol || "",
    }

    try {
        res.send(await Team.list(params));
    } catch (ex) {
        throw (ex);
    }
}