const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //Using the exported module from date.js

const app = express();

const newItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs"); //Using views
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //To use css we have to define using express static

app.get("/", (req, res) => {
    day = date.getDate(); //Calling function getDate defined in date.js
    res.render("list", { listTitle: day, newListItems: newItems }); //render looks for views folder and the file list inside it
    //kindOfDay and newListItems are passed to list.ejs
    //render kindOfDay and newListItems on the homepage when there is a get request,so we write in get and not post
    //(Pressing localhost:300 we should get kindOfDay and newListItems on home page )
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/", (req, res) => {
    const item = req.body.newitem;
    //res.render("list", { newListItems: newItems })
    if (req.body.list == "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        newItems.push(item);
        res.redirect("/");
    }
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`Server listening on port 3000`);
});