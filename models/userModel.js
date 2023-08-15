const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {isEmail} = require("validator");

const bcrypt = require("bcrypt")

const validateName = (name) => {
    
    Regex =/^[A-Za-z]+$/;

    if(Regex.test(name))
    {
        return true;
    } else {
        return false;
    }
}

const userSchema = new Schema({
    username: {
        type : String,
        required: [true, "Provide a username"],
        unique: true,
        lowercase: true,
        minlength: [5, "Minimum username length allowed is 5"]
    },
    email: {
        type: String,
        unique: true,
        required:[true,"Email is required"],
        lowercase: true,
        validate: [isEmail, "Please provide a valid email"]


    },
    firstname: {
        type: String,
        required: [true, "First name is required"],
        validate: [validateName, "Invalid firstname"]
    
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        validate: [validateName, "Invalid lastname"]
    
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8,"Password Minimum length is 8 characters"]
    },
    downvotes: {
        type: [String],
        default :[]
    },
    upvotes: {
        type : [String],
        default: []
    }
}, {timestamps: true})

// static methods for user model
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
}

// fire function before save to db
userSchema.pre("save", async function (next) {
    // console.log("User about to be created:", this)

    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;