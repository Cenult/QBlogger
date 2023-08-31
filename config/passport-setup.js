const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const UserModel = require("../models/userModel");

// passport.serializeUser((user, done) => {
//     done(null, user)
// })

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await UserModel.findById(id);
//         done(null, user);
//     } catch (error){
//         console.log(error);
//     }
// })

passport.use(
    new GoogleStrategy({
        // Options
        callbackURL:"/auth/google/redirect",
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log("Passport callback function fired")
        console.log(profile);

        const user = await UserModel.findOne({email:profile.emails[0].value});
        if (!user){
            const response = await UserModel.create({
                email:profile.emails[0].value,
                username:(profile.name.givenName.toLowerCase() + profile.name.familyName.toLowerCase() + profile.id).slice(0, 18),
                googleid: profile.id,
                firstname:profile.name.givenName,
                lastname: profile.name.familyName,
                password: profile.id
            })
            done(null, response);
        } else {
            done(null, user);
        }
        
       
    })
);
