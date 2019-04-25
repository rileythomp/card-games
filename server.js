const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3032

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.listen(
    PORT,
    () => console.log(`Server listening on ${PORT}`)
)