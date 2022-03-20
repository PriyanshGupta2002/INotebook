const connect_to_Mongo=require('./db')
const express = require('express')
connect_to_Mongo()
var cors = require('cors')
const app = express()
const port = 80
app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
