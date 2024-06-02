const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 4000
const api = require('./routes/api')
const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use('/api', api)

app.get('/', (req, res) => {
    res.send("Server is running on localhost:4200")
})

app.listen(PORT, function(){
    console.log('server running on http://localhost:4000')
})