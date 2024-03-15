const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Channel = require('../models/channel')
const jwt = require('jsonwebtoken');

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

async function validateChannel(req, res, next) {
    const token = req.cookies.access_token
  
    try{
      const decoded = jwt.verify(token, 'secret123')
      const email = decoded.email
      
      next()
  }catch(error){
      return res.json({status:'error', error:'Invalid access to channel'})
}}

router.get('/', validateCookie, async (req, res) => {
    const token = req.cookies.access_token

    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    // Get user's channels
    const adminChannels = await User.find({email: email}, 'channels')

    const channels = await Channel.find({});
    // const adminChannels = await User.find({});
    res.render('channels.ejs', {channels: channels, adminChannels: adminChannels[0].channels})
})

router.get('/:id', validateCookie, async (req, res) => {
    const token = req.cookies.access_token
    const id = req.params.id

    // Confirm user has access to channel
    const channelQuery = await Channel.findById(id, 'users')
    const {users} = channelQuery
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email

    if (!users.includes(email))
        res.send("Unauthorized to access this channel")
    else {
        res.render('channel.ejs')
    }

})

module.exports = router