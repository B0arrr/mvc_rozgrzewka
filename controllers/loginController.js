const User = require("../models/User")
const bcrypt = require("bcryptjs")

let registerUser = (req, res) => {
    const {firstName, lastName, email, password} = req.body
    User.findOne({Email: email})
        .then(user => {
            if (user) {
                res.render('login', {
                    firstName,
                    lastName,
                    password,
                    message: 'Podany Email jest już zajęty'
                })
            } else {
                const newUser = new User({
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Password: password,
                    CreatedOn: Date.now()
                })
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.Password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.Password = hash
                        newUser.save()
                            .then(() => {
                                req.flash('createMessage', 'Utworzono użytkownika')
                                res.redirect("/login")
                            })
                            .catch((err) => console.log(err))
                    })
                )
            }
        })
}

let loginUser = (req, res) => {

}

const logoutUser = (req, res) => {
    req.logout()
    req.flash('logoutMessage', 'Wylogowano pomyślnie')
    res.redirect('/')
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}