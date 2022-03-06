let router = require('express').Router()
const {
    mainView,
    favouriteView,
    myAccountView,
    loginView,
    registerView,
} = require('../controllers/viewsController')
const {
    loginUser,
    registerUser,
    logoutUser,
} = require('../controllers/loginController')
const {protectRoute} = require("../auth/protect");

router.get('/', mainView)
router.get('/favorite', protectRoute, favouriteView)
router.get('/account', protectRoute, myAccountView)
router.get('/login', loginView)
router.get('/register', registerView)
router.get('/logout', logoutUser)

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router