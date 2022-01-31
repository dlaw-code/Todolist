const express = require("express");


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
let items = ["Cabbage", "Ata Rodo(Red Pepper)", "Onion"];
let workLists = [];

app.get("/", function(req,res) {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function(req,res) {
    let item = req.body.newList;
    if(req.body.list === "Work") {
         workLists.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }
     
     
})

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workLists});
})





app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000");
})