const BlogModel = require("../models/blogModel");

const handleErrors = (error) => {
    
    console.log(error.message,error.code);

    errors = {title: "", body:""};
    if (error.code == 11000){
        if (error.keyPattern.title == 1){
            errors["title"] = "This blog title already exists";
        } 
    }
    if (error.message.includes("blog validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;

}

exports.get_createBlog = (req, res) => {
    res.render("createBlog", {title : "Create Blog"});
}

exports.post_createBlog = async (req, res) => {
    console.log("Body",req.body);
    const {title, body} = req.body;
    try {
        const data = await BlogModel.create({
            userid:res.locals.user._id,
            title, body, username: res.locals.user.username
        })
        res.json({id:data._id});

    } catch (error) {
        console.log(error);
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
}

exports.get_myBlogs = async (req,res) => {
    res.render("myBlogs", {title:"My Blogs"});
}

exports.put_vote = async (req,res) => {
    console.log("Req Body:",req.body);

    const blog = await BlogModel.findById(req.body.blogid);
    let updatedBlog;
    console.log("Blog:",blog);
    if (req.body.count == blog[req.body.update+"s"]){
        if (req.body.update == "upvote"){
            updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {upvotes:req.body.count+1});
            res.json({upvotes:blog["upvotes"]+1, downvotes: blog["downvotes"]});

        } else if (req.body.update == "downvote"){
            updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {downvotes:req.body.count+1});
            res.json({downvotes:blog["downvotes"]+1, upvotes: blog["upvotes"]});
        }
    } else {
        res.json({errors: "Wrong Vote Count"});
    }
    
    
    
    
}