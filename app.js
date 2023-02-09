//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema ={
  name: String
}

const item = mongoose.model("Item",itemsSchema);

const item1 = new item({name: "Welcome to your To Do List!"});

const item2 = new item({name: "Hit the + button to add a new item."});

const item3 = new item({name: "<-- Hit this to delete an item"});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {

  item.find({}, function(err, items){

    if (items.length === 0){
      item.insertMany(defaultItems, function(err){
        if (err){
          console.log(err);
        } else {
          console.log("Successfully added items");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const newItem = new item({name: itemName});

  newItem.save();

  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});