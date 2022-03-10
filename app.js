

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb+srv://Bluehost:Blue123@cluster0.vb7so.mongodb.net/todolistDB")

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Click on the + button to add item"
})

const item2 = new Item({
    name: "click on the checkbox to delete an item"
})

const item3 = new Item({
    name: "Onions"
})

const defaultItems = [item1,item2,item3];






app.get("/", function(req,res) {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options);

    Item.find({}, function(err, foundItems) {

        if(foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved to the database");
                }
            });
            res.redirect("/");
        } else{
            res.render("list", { listTitle: day, newListItems: foundItems });
        }

        
    })

    
})

app.post("/", function(req,res) {
    const itemName = req.body.newList;
    
    const item = new Item({
        name: itemName
    })

    item.save();
    res.redirect("/");
     
})

app.post("/delete", function(req,res) {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkedItemId, function(err) {
        if(!err) {
            console.log("Successfully deleted checked item");
            res.redirect("/");
        }
    });
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workLists});
})





app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000");
})