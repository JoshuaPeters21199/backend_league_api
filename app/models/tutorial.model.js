const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.title = tutorial.title;
  this.author_email=tutorial.author_email,
  this.author_first=tutorial.author_first,
  this.author_last=tutorial.author_last,
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Tutorial.create = async (newTutorial, result) => {
  try{
    let result=await sql.query("INSERT INTO tutorials SET title = ?, author_email = ?, author_first = ?, author_last = ?, description = ?, published = ?", 
    [newTutorial.title, newTutorial.author_email, newTutorial.author_first, newTutorial.author_last, newTutorial.description , newTutorial.published ]);
    
    return { id: result.insertId, ...newTutorial };
  
  }
  catch(err){
    console.log("error: ", err);
    throw(err);
  }
  
};

Tutorial.list = async (params, result) => {
  let query = `select id, title, author_name, author_email, description, published
  from (SELECT t.id, t.title, CONCAT(t.author_first, ' ',t.author_last) as author_name, t.author_email, t.description,t.published
  FROM tutorials t) as x`;

  if(params.filterCol && params.filterStr){
    query+= ` WHERE  x.${params.filterCol} like '%${params.filterStr}%'`;
  }
  if(params.sortCol && params.sortDir){
    query+= ` Order By  x.${params.sortCol} ${params.sortDir}`;
  }
  console.log(query);

  try{
    let result=await sql.query(query);
  
    return result;
  
  }
  catch(err){
    console.log("error: ", err);
    throw(err);
  }
};
Tutorial.checkDuplicateEmail= async (email)=>{
  try{
    let result=await sql.query("select * from tutorials where author_email = ?", [email]);
    if(result.length) 
      return Promise.reject("duplicate email ");
    else 
      return Promise.resolve("email good");
  }
  catch(err){
    console.log("error: ", err);
    throw(err);
  }
}

module.exports = Tutorial;