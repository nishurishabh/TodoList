var bodyParser = require("body-parser");
 
 var mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://test:test@ds235860.mlab.com:35860/todo");

var todoSchema = new mongoose.Schema({
item: String
});

var Todo = mongoose.model('Todo', todoSchema);



//var data = [{item: 'Cricket'}, {item: 'Badminton'}, {item: 'CS GO'}];

var urlencodedParser = bodyParser.urlencoded({ extended: false});

module.exports = function(app){


app.get("/todo", function(req, res){
    // get data  from mongoDb and send to the view
Todo.find({} ,function(err, data){
    if (err) throw err;
    res.render("todo", {todos: data});
});
});

app.post("/todo", urlencodedParser, function(req, res){
    // get data from view and add to mongoDB
var newTodo = Todo(req.body).save(function(err, data){
    //if (err) throw err;
    res.json(data);
    
});
});



app.delete("/todo/:item", function(req, res){
 
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });

});
// delete the requested item from mongoDB
}