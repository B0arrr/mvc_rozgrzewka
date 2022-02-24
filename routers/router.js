let router = require('express').Router()
const {mainView, loginView, registerView} = require('../controllers/controller')

router.get('/', mainView)
router.get('/login', loginView)
router.get('/register', registerView)

module.exports = router