const BlogModel = require("../models/blogModel");
const CommentModel = require("../models/commentModel");
const UserModel = require("../models/userModel");

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
    console.log(error.errors);
    if (error.message.includes("comment validation failed")) {
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
    if (res.locals.user){
        try {
            res.locals.blogs = await BlogModel.find({userid:res.locals.user.id})
        } catch (error) {
            console.log("Blog Fetch Error: ",error);
        }
        
    }
    res.render("myBlogs", {title:"My Blogs"});
}

exports.put_vote = async (req,res) => {

    const blog = await BlogModel.findById(req.body.blogid);
    let updatedBlog;



    if (req.body.count == blog[req.body.update+"s"]){
        if (req.body.update == "upvote"){
            if (!res.locals.user.upvotes.includes(blog.id)){

                updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {upvotes:req.body.count+1});

                const arr = res.locals.user.upvotes;
                arr.push(blog.id);
                
        
                await UserModel.findByIdAndUpdate(res.locals.user.id, {upvotes: arr});

                res.json({upvotes:blog["upvotes"]+1, downvotes: blog["downvotes"]});
            } else {
                updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {upvotes:req.body.count-1});

                const arr = res.locals.user.upvotes;

                const index = arr.indexOf(blog.id);

                if (index > -1) { // only splice array when item is found
                    arr.splice(index, 1); // 2nd parameter means remove one item only
                }

                await UserModel.findByIdAndUpdate(res.locals.user.id, {upvotes: arr});

                res.json({upvotes:blog["upvotes"]-1, downvotes: blog["downvotes"]});
            }
            

        } else if (req.body.update == "downvote"){

            if (!res.locals.user.downvotes.includes(blog.id)){

                updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {downvotes:req.body.count+1});

                const arr = res.locals.user.downvotes;
                arr.push(blog.id);
        
                await UserModel.findByIdAndUpdate(res.locals.user.id, {downvotes: arr});

                res.json({upvotes:blog["upvotes"], downvotes: blog["downvotes"]+1});
            } else {
                updatedBlog = await BlogModel.findByIdAndUpdate(req.body.blogid, {downvotes:req.body.count-1});

                const arr = res.locals.user.downvotes;

                const index = arr.indexOf(blog.id);

                if (index > -1) { // only splice array when item is found
                    arr.splice(index, 1); // 2nd parameter means remove one item only
                }

                await UserModel.findByIdAndUpdate(res.locals.user.id, {downvotes: arr});

                res.json({upvotes:blog["upvotes"], downvotes: blog["downvotes"]-1});
            }
            
        }
    } else {
        res.json({errors: "Wrong Vote Count"});
    }
    
}

// exports.post_comment =  async (req, res) => {
//     console.log(req.body);
//     console.log(req.params);
//     res.json({body:req.body});
// }

exports.get_comment = async (req, res) => {
    console.log(req.params);
    try {
        const comment = await CommentModel.find({blogid: req.params.id}).sort({createdAt: -1});

        res.json({comments:comment});
    } catch (error) {
        console.log(error);
        res.status(404).json({errors:"Comments Not found"});
    }
}

exports.post_comment = async (req, res) => {
    console.log(req.params);

    if (res.locals.user){
        try {
            const blog = await BlogModel.findById(req.params.id);
            if (blog){
                
                const data = await CommentModel.create({
                    userid:res.locals.user.id, username: res.locals.user.username,
                    blogid: req.params.id, content: req.body.content
                })
                const comments = await CommentModel.find({blogid:req.params.id});
                await BlogModel.findByIdAndUpdate(req.params.id, {comments: comments.length})
                res.json({id:data.id});
            } else {
                res.status(400).json({errors:{content:"Blog not found"}});
            }
            
    
        } catch (error) {
            console.log(error);
            const errors = handleErrors(error);
            res.status(400).json({errors});
        }
    } else {
        res.json({errors: "User not authenticated"});
    }
    
    
}