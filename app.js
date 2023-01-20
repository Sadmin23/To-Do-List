const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const items = [];
const workItems = [];

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public')); 

app.set('view engine', 'ejs');

app.get("/", function(req, res){

  let day = date.getDate();

  res.render("list", {Title: day, newListitems: items});
})

app.post("/", function(req, res){
  
  let item = req.body.newItem;

  if (req.body.button === "Work List"){

    workItems.push(item);
  
    res.redirect("/work");    
  }
  else{

    items.push(item);

    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {Title: "Work List", newListitems: workItems});
})

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})