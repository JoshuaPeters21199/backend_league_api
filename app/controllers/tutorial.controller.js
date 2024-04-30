const Tutorial = require("../models/tutorial.model.js");
const { body,validationResult } = require('express-validator');

exports.validate = (method) => {
  let rules=[
    body('title','title cannot be empty').not().isEmpty().trim().escape(),
    body('author_email','email cannot be empty').not().isEmpty(),
    body('author_email','email address malformed').isEmail(),
    body('author_first', 'author first name cannot be empty').not().isEmpty(),
    body('author_last', 'author last name cannot be empty').not().isEmpty(),
    body('description').trim().escape(),   //just sanitize 
    body('published').trim().escape()   //just sanitize 
  ]
  switch (method) {
    case 'updateTutorial':
      return rules; 
    case 'createTutorial': {
      let createRules=[...rules];
      createRules.push(
        body('author_email').custom(async (value) => { 
          return await Tutorial.checkDuplicateEmail(value);
      }))
     return createRules;
    }
  }
}

// Create and Save a new Tutorial
exports.create = async(req, res) => {
  
    // Validate request
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
  
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
    
    // Create a Tutorial
    const tutorial = new Tutorial({
      title: req.body.title,
      author_email: req.body.author_email,
      author_first: req.body.author_first,
      author_last: req.body.author_last,

      description: req.body.description,
      published: req.body.published || false
    });
  
    // Save Tutorial in the database
    try{
      let result=await Tutorial.create(tutorial);
      res.status(201).send(result);
   }catch(err){
     throw(err);
   }
    
  };
  exports.list = async (req, res) => {
    const params = {
      sortCol: req.query.sortCol || "title",
      sortDir: req.query.sortDir || "asc",
      filterStr: req.query.filterStr|| "",
      filterCol: req.query.filterCol || "",
    }
  
    try{
      res.send(await Tutorial.list(params));
    }
    catch(ex){
     throw(ex);
    }
  };

