const BlogModel = require("../models/blogModel");
const CommentModel = require("../models/commentModel")

exports.get_home = async (req, res) => {
    res.locals.blogs = await BlogModel.find().sort({createdAt: -1});
    res.locals.comments = await CommentModel.find({blogid:res.locals.blogs.id})

    res.render("index", {title : "Home Page"});
}

exports.get_about = (req, res) => {
    res.render("about", {title: "About Us"});
}
