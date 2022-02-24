let express = require('express')
let app = express()
const path = require('path')
const port = 2137

app.set('view engine', 'pug')
app.use(express.urlencoded({extended: false}))
app.use('/', require('./routers/router'))

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () =>console.log(`http://localhost:${port}`))