let mainView = (req, res) => {
    res.render('content')
}

let loginView = (req, res) => {
    res.render('login')
}

let registerView = (req, res) => {
    res.render('register')
}
let mainLoggedView = (req, res) => {
    res.render('contentForLogged')
}
let favoriteView = (req, res) => {
    res.render('favorite')
}
let myAccountView = (req, res) => {
    res.render('myAccount')
}
module.exports = {
    mainView,
    loginView,
    registerView,
    mainLoggedView,
    favoriteView,
    myAccountView,
}