let express = require('express')
let app = express()
const port = 2137

app.set('view engine', 'pug')
app.use(express.urlencoded({extended: false}))
app.use('/', require('./routers/router'))

app.listen(port, () =>console.log(`http://localhost:${port}`))