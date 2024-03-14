const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require("socket.io");

// Configure application
const app = express(); 
const server = http.createServer(app);
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended :false}))
app.use(cookieParser())

// Socket setup 
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// Connect to DB
const dbURI = 'mongodb+srv://colecody27:password1234@cluster0.exzeuin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
  .connect(dbURI)
  .then((result) =>
    server.listen(3000, (req, res) => {
      console.log("Connected to DB listening on port 3000");
    })
  )
  .catch((error) => console.log(error));

// Routes
const userRoutes = require('./src/routes/user');
const channelRoutes = require('./src/routes/channel');
app.use('/api/user', userRoutes)
app.use('/api/channels', channelRoutes)

async function validateCookie(req, res, next) {
  const token = req.cookies.access_token

  if (token == null) return res.sendStatus(401)

  try{
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    next()
}catch(error){
    return res.json({status:'error', error:'Invalid Token'})
}}

// Login Page 
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
// Register Page 
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
// // Channels Page 
// app.get('/channels', (req, res) => {
//     res.render('channels.ejs', {channels: req.body[0]})
// })
// Channel Page 
app.get('/channel', validateCookie, (req, res) => {
  res.render('channel.ejs')
})
