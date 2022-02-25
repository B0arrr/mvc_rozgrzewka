let router = require('express').Router()
const {mainView, loginView, registerView, mainLoggedView, favoriteView, myAccountView} = require('../controllers/controller')

router.get('/', mainView)
router.get('/login', loginView)
router.get('/register', registerView)
router.get('/contentForLogged',mainLoggedView)
router.get('/favorite',favoriteView)
router.get('/myAccount',myAccountView)
module.exports = router