const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};
const handleErrors = (error) => {
    console.log(error.message,error.code);
    errors = {username:"",email:"",password:"",firstname:"",lastname:""};
    if (error.code == 11000){
        if (error.keyPattern.username == 1){
            errors["username"] = "Username already exists";
        } else if (error.keyPattern.email == 1){
            errors["email"] = "Email already exists";
        }
    }
    // For login
    
    if (error.message == "incorrect email"){
        errors.email = "Email not found";
    } 
    if (error.message == "incorrect password"){
        errors.password = "Incorrect password";
    }

    // For signup
    if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    
    return errors;
}

exports.login_get = (req, res) => {
    
    res.render("login", {title : "Login"})
}
exports.login_post = async (req, res) => {
    console.log(req.body);
    try {
        const userData = await UserModel.login(
            req.body.email,
            req.body.password
        );
        const token = createToken(userData._id);
        res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json({id:userData._id});

    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
    // res.json({response:"Logged In"});
}
exports.signup_get =  (req, res) => {
    console.log(req.body);
    res.render("signup", {title: "Sign Up"})

    
}
exports.signup_post = async(req, res) => {
    console.log(req.body);
    let { username, email, password, firstname, lastname} = req.body;
    try {
        let response = await UserModel.create({
            username,
            email,
            firstname,
            lastname,
            password
        });
        const token = createToken(response._id);
        console.log(response);
        res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(201).json({id:response._id});

    } catch (error) {
        // console.log(error)
        let errors = handleErrors(error);
        console.log({errors});
        res.status(400).json({errors});
    }
    
}
exports.logout_get = (req, res)=> {
    res.cookie("jwt", "", {maxAge: 1});
    res.redirect("/");
}