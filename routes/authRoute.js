const router = require("express").Router();
const {signup_get, signup_post, login_get, login_post, logout_get, google_get, redirect_get} = require("../controllers/authController");
const passport = require("passport");



router.get("/signup",signup_get);
router.get("/login",login_get);
router.post("/signup",signup_post);
router.post("/login",login_post);
router.get("/logout",logout_get);
router.get("/auth/google",passport.authenticate("google", {
    scope: ["profile","email"], 
        session: false,
        // successRedirect : '/',
        failureRedirect : '/404'
    
}));

// callback route for google to redirect to
router.get("/auth/google/redirect", passport.authenticate("google", {
    session: false,
    // successRedirect : '/',
    failureRedirect : '/404'
}), redirect_get);


module.exports = router;