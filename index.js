let express = require('express')
let app = express()
const flash = require('connect-flash')
const path = require('path')
const passport = require('passport')
const {loginCheck} = require('./auth/passport')
const session = require('express-session')
const mongoose = require("mongoose")
const port = 2137

loginCheck(passport)

const database = 'mongodb://localhost:27017/mvc_rozgrzewka_db?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Poloczono'))
    .catch(err => console.log(err))

app.set('view engine', 'pug')

app.use(express.urlencoded({extended: false}))

app.use(flash())
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routers/router'))

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () =>console.log(`http://localhost:${port}`))