let mainView = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('contentForLogged', {user: req.user})
        return
    }
    res.render('content', {
        logoutMessage: req.flash('logoutMessage')
    })
}

let favouriteView = (req, res) => {
    res.render('favorite', {user: req.user})
}

let myAccountView = (req, res) => {
    res.render('myAccount', {user: req.user})
}

let loginView = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/')
    res.render('login', {
        loginMessage: req.flash('loginMessage'),
        createMessage: req.flash('createMessage')
    })
}

let registerView = (req, res) => {
    if (req.isAuthenticated()) res.redirect('/')
    res.render('register')
}

module.exports = {
    mainView,
    favouriteView,
    myAccountView,
    loginView,
    registerView,
}