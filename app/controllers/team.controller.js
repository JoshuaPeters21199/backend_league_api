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