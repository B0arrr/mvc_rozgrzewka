const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

const loginCheck = passport => {
    passport.use(
        new LocalStrategy({
                usernameField: "email",
                passwordField: 'password',
                passReqToCallback: true},
            (req, email, password, done) => {
                User.findOne({ Email: email })
                    .then((user) => {
                        if (!user) {
                            return done(null, false, req.flash('loginMessage', 'Podano nieprawidłowy email'))
                        }
                        bcrypt.compare(password, user.Password, (error, isMatch) => {
                            if (error) throw error
                            if (isMatch) {
                                return done(null, user)
                            }
                            return done(null, false, req.flash('loginMessage', 'Podane hasło jest nieprawidłowe'))
                        })
                    })
                    .catch((error) => console.log(error))
            })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user)
        })
    })
}

module.exports = {
    loginCheck
}