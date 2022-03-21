let router = require('express').Router()
const {
    mainView,
    favouriteView,
    myAccountView,
    loginView,
    registerView,
    productView,
    getFavicon,
} = require('../controllers/viewsController')
const {
    loginUser,
    registerUser,
    logoutUser,
} = require('../controllers/loginController')
const {protectRoute} = require("../auth/protect");
const {
    addToFavorites,
    deleteFromFavorites,
    getFavorites
} = require("../controllers/favoritesController")

router.get('/favicon', getFavicon)
router.get('/', mainView)
router.get('/favorite', protectRoute, favouriteView)
router.get('/account', protectRoute, myAccountView)
router.get('/login', loginView)
router.get('/register', registerView)
router.get('/logout', logoutUser)
router.get('/product', productView)
router.get('/getFavorites', getFavorites)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/addToFavorites', addToFavorites)
router.post('/removeFromFavorites', deleteFromFavorites)

module.exports = router