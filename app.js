// Importing Essentials
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


//Routes
const homeRoute = require("./routes/homeRoute");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const {authUser, checkAuth} = require("./middleware/authMiddleware");

// One time settings
dotenv.config({path: "./config.env"});
// dotenv.config();
const app = express();
app.set("view engine", "ejs");
// const passport = require("passport");
const passportSetup = require("./config/passport-setup");

// Starting server
mongoose.connect(process.env.DATABASE_URL).then(() => {
    app.listen(process.env.PORT || 80, () => {
        console.log("Server has started");
    })
}).catch(error => {
    console.log(new Error("MongoDB : Authentication failed"));
})

// Essential Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// handlers
app.all("*",authUser);
app.use("/",homeRoute);
app.use("/",authRoute);
app.use("/", blogRoute);



app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")){
        res.render("404", {title:"Not Found"})
    } else {
        res.json({"404": "Not Found"})
    }
})



