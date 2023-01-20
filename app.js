const express = require("express");
const bodyParser = require("body-parser");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public')); 

app.set('view engine', 'ejs');

app.get("/", function(req, res){

    let today = new Date();

    let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

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

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})