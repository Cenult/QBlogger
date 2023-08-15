const BlogModel = require("../models/blogModel");

exports.get_home = async (req, res) => {
    res.locals.blogs = await BlogModel.find().sort({createdAt: -1});
    res.render("index", {title : "Home Page"});
}