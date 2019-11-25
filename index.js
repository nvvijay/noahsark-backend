const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

app = express()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))