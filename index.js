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
const channelRoutes = require('./src/routes/channel');
app.use('/api/user', userRoutes)
app.use('/api/channels', channelRoutes)

// Login Page 
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
// Register Page 
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
// Channels Page 
app.get('/channels', (req, res) => {
    res.render('channels.ejs', {channels: req.body[0]})
})
// Channel Page 
app.get('/channel', (req, res) => {
  res.render('channel.ejs')
})
