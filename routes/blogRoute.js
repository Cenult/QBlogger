const router = require("express").Router();
const blogController = require("../controllers/blogController");
const {checkAuth} = require("../middleware/authMiddleware");

router.get("/createBlog",checkAuth, blogController.get_createBlog);
router.post("/createBlog",checkAuth, blogController.post_createBlog);
router.get("/myBlogs",checkAuth, blogController.get_myBlogs);
router.put("/updateVote",checkAuth, blogController.put_vote);
router.get("/blog/getComment/:id" , blogController.get_comment);
router.post("/blog/postComment/:id",checkAuth, blogController.post_comment);

module.exports = router;