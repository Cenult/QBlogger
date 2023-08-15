const router = require("express").Router();
const blogController = require("../controllers/blogController");
const {checkAuth} = require("../middleware/authMiddleware");

router.get("/createBlog", blogController.get_createBlog);
router.post("/createBlog", blogController.post_createBlog);
router.get("/myBlogs", blogController.get_myBlogs);
router.put("/updateVote", blogController.put_vote);
module.exports = router;