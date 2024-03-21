const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const Channel = require('./src/models/channel')
require('dotenv').config()

// Configure application
const app = express(); 
const server = http.createServer(app);
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended :false}))
app.use(cookieParser())

// Connect to DB
mongoose
  .connect(process.env.DB_URL)
  .then((result) =>
    server.listen(process.env.PORT, (req, res) => {
      console.log(`Connected to DB listening on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));

// Socket setup 
const io = new Server(server);
io.on('connection', async (socket) => {
  const roomId = socket.handshake.query.room
  console.log('User connected to room ' + roomId);
  socket.join(roomId)

  // Send message
  socket.on('chat message', async ({msg, username}) => {
    // Store message
    const doc = await Channel.findById(roomId)
    doc.messages.push({'sender': username, 'message': msg})
    await doc.save();

    // Emit message 
    io.emit('chat message', {msg: msg, username: username});
    console.log(`User ${username} sent: ${msg}`)
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Routes
const userRoutes = require('./src/routes/user');
const channelRoutes = require('./src/routes/channel');
app.use('/api/user', userRoutes)
app.use('/api/channels', channelRoutes)

async function validateCookie(req, res, next) {
  const token = req.cookies.access_token

  if (token == null) return res.sendStatus(401)

  try{
    const decoded = jwt.verify(token, process.env.SALT)
    next()
}catch(error){
    return res.json({status:'error', error:'Invalid Tokens'})
}}

async function validateCookies(req, res, next) {
  const token = req.cookies.access_token

  if (token == null) return res.sendStatus(401)

  try{
    const decoded = jwt.verify(token, process.env.SALT)
    next()
}catch(error){
    return res.json({status:'error', error:'Invalid Tokens'})
}}

// Login Page 
app.get('/', (req, res) => {
    res.render('login.ejs')
})
// Register Page 
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
// Channel Page 
app.get('/channel', validateCookie, (req, res) => {
  res.render('channel.ejs')
})
