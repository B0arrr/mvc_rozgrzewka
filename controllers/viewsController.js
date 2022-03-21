const {getProducts, getProductDetails} = require("./scraperController");
const Product = require("../models/Product")
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
    } else {
        res.render('content', {
            logoutMessage: req.flash('logoutMessage'),
            products: data
        })
    }
}

let favouriteView = async (req, res) => {
    let favourites = []
    await Promise.all(req.user.Favorites.map(async x => {
        favourites.push(await Product.findOne({product_id: x}))
    }))
    res.render('favorite', {user: req.user, favourites: favourites})
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

let productView = async (req, res) => {
    const {id} = req.query
    let data = ''
    if (id) {
        data = await getProductDetails(id)
    }
    if (req.isAuthenticated()) {
        res.render('productForLogged', {
            user: req.user,
            product: data
        })
    } else {
        res.render('product', {
            product: data
        })
    }
}

let getFavicon = (req, res) => {
    res.sendFile('favicon.ico')
}

module.exports = {
    mainView,
    favouriteView,
    myAccountView,
    loginView,
    registerView,
    productView,
    getFavicon,
}