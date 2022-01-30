const express = require("express");


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var items = ["Cabbage", "Ata Rodo(Red Pepper)", "Onion"];


app.get("/", function(req,res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { kindOfDay: day, newListItems: items });
})

app.post("/", function(req,res) {
     item = req.body.newList;
     items.push(item);
    res.redirect("/");
})



app.listen( process.env.PORT || 3000, function() {
    console.log("Listening on port 3000");
})