const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.checkLoggedStatus = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            req.cookies.jwt,
            process.env.TOKEN_SECRET,
            async (error, decodedToken) => {
                if (error) {
                    console.log(error);
                    res.redirect("/signin");
                } else {
                    // const user = await UserCredentialModel.findById(decodedToken.id);
                    // res.locals.user = user;
                    next();
                }
            }
        );
    } else {
        res.redirect("/signin");
    }
    
};
exports.checkAuth = function(req, res, next){
    if (res.locals.user){
        next();
    } else {
        res.redirect("/login");
    }
}
exports.authUser = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            req.cookies.jwt,
            process.env.TOKEN_SECRET,
            async (error, decodedToken) => {
                if (error) {
                    console.log(error);
                    res.locals.isAuth = false;
                    res.locals.user = null;
                    next();
                } else {
                    const user = await UserModel.findById(decodedToken.id);
                    res.locals.isAuth = true;
                    res.locals.user = user;
                    next();
                }
                

            }
        );
    } else {
        res.locals.isAuth = false;
        res.locals.user = null;
        next();
    }
    
};