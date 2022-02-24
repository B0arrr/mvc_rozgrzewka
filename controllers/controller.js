let mainView = (req, res) => {
    res.render('content')
}

let loginView = (req, res) => {
    res.render('login')
}

let registerView = (req, res) => {
    res.render('register')
}

module.exports = {
    mainView,
    loginView,
    registerView,
}