let mainView = (req, res) => {
    res.render('content', {
        logoutMessage: req.flash('logoutMessage')
    })
}

let loginView = (req, res) => {
    res.render('login', {
        loginMessage: req.flash('loginMessage'),
        createMessage: req.flash('createMessage')
    })
}

let registerView = (req, res) => {
    res.render('register')
}

module.exports = {
    mainView,
    loginView,
    registerView,
}