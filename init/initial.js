const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Quora');
}


const data = require("./data.js");
const  Post = require("../models/model.js");

const initDB = async () => {
    await Post.deleteMany({});
    await Post.insertMany(data);

    console.log("DB initialized");
}


initDB();
