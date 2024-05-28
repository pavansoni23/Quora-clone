/*
    npm init -y
    npm i express
    npm i ejs
    npm i mongoose
*/

const express = require("express");
const app = express();

app.set("view engine" , "ejs");

const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Quora');
}


const path = require("path");

const methodOverride = require("method-override"); 
app.use(methodOverride("_method"));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));



const Post = require("./models/model.js");





// INDEX route
app.get("/posts" , async (req , res) => {
    const allData = await Post.find();
    res.render("index.ejs" , {allData});
});



// CREATE route
app.get("/posts/new" , (req , res) => {
    res.render("new.ejs");
});


app.post("/posts" , (req , res) => {
    let {username , image , content} = req.body;
    
    const newData = new Post ({
        username : username , 
        image : image,
        content : content
    });

    newData.save();

    res.redirect("/posts");
});




app.get("/posts/:id/edit" , async (req , res) => {
    let {id} = req.params;

    let data = await  Post.findById(id);

    res.render("edit.ejs" , {data});
});


app.patch("/posts/:id" , async (req , res) => {
    let {id} = req.params;

    let {image , content} = req.body;

    let data = await  Post.findByIdAndUpdate(id , 
        {
            image : image,
            content : content
        }
    );

    // console.log(data);

    res.redirect("/posts");

});


app.get("/posts/:id" , async (req , res) => {
    let {id} = req.params;

    let data = await  Post.findById(id);

    // console.log(data);

    res.render("show.ejs" , {data});
});




app.delete("/posts/:id" , async (req , res) => {
    let {id} = req.params;

    await Post.findByIdAndDelete(id);

    res.redirect("/posts");
});








app.listen(8080 , () => {
    console.log("Server is listening");
});


