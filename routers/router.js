let router = require('express').Router()
const {mainView, loginView, registerView} = require('../controllers/viewsController')
const {loginUser, registerUser} = require('../controllers/loginController')

router.get('/', mainView)
router.get('/login', loginView)
router.get('/register', registerView)

router.post('/register', registerUser)

module.exports = router