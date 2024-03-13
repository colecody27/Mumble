// const mongoose = require('mongoose');
const express = require('express');
const app = express(); 
const port = 8080;

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

const loginRouter = require('./src/routes/login')
app.use('/login', loginRouter)

app.listen(port, () => {
    console.log(`Server live on: http://localhost:${port}`)
}) 



