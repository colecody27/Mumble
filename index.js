const mongoose = require('mongoose');
const express = require('express');

// Configure application
const app = express(); 
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended :false}))

// Connect to DB
const dbURI = 'mongodb+srv://colecody27:password1234@cluster0.exzeuin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, (req, res) => {
      console.log("Connected to DB listening on port 3000");
    })
  )
  .catch((error) => console.log(error));

// Routes
const userRoutes = require('./src/routes/user');
app.use('/api/user', userRoutes)

// Pages
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

