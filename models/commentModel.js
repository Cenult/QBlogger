const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    userid: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required : true
    },
    blogid: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: [true, "Comment can't be empty"],
        maxlength: [150, "Comment can't be longer than 150 letters"]
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
},{timestamps: true})

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;