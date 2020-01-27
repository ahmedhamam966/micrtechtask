const express = require('express')
require('./db/mongoose')
const cors = require('cors')
const userrouter = require('./routers/user')
 const detailrouter = require('./routers/detail')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userrouter)
app.use(detailrouter)
 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
 