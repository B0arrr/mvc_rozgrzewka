let router = require('express').Router()
const {mainView} = require('../controllers/controller')

router.get('/', mainView)

module.exports = router