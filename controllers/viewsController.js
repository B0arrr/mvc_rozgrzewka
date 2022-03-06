const {getProducts} = require("./scraperController");
let mainView = async (req, res) => {
    const {search} = req.query
    let data = ''
    if (search) {
        data = await getProducts(search)
    }
    if (req.isAuthenticated()) {
        res.render('contentForLogged', {
            user: req.user,
            products: data
        })
        return
    }
    res.render('content', {
        logoutMessage: req.flash('logoutMessage'),
        products: data
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

let scrapeContent = (req, res) => {
    const {search} = req.body
    console.log(search)
    getProducts(search)
    res.redirect('/')
}

module.exports = {
    mainView,
    favouriteView,
    myAccountView,
    loginView,
    registerView,
    scrapeContent,
}