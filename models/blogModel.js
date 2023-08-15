const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title : {
        type:String,
        minlength: [4, "Minimum title length allowed is 4"],
        unique: true,
        required: [true, "Provide a blog title"],
        maxlength: [50, "Maximum title length allowed is 50"],
    },
    body : {
        type: String,
        minlength: [50, "Minimum title length allowed is 50"],
        required: [true, "Provide a blog body"],
        maxlength: [10000, "Maximum body length allowed is 10000"]
    },
    userid: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;