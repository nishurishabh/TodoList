var express = require('express');
var todoController = require("./controllers/todoController");
var app = express();


// fire controllers

todoController(app);

//set up the template engine


app.set("view engine", "ejs");

//static  files



app.use(express.static("./assets"));



app.listen(1000);
console.log("you are listening to port 1000");