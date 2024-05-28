const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    }, 

    image : String,  // url
    
    content : String
});

const Post = new mongoose.model("Post" , postSchema);           // Collection -> posts

module.exports = Post;