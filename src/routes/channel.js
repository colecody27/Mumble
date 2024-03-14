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

router.get('/', validateCookie, async (req, res) => {
    // const authHeader = req.headers['authorization']
    // console.log(authHeader)
    // Authenticate user
    // console.log(req.cookies.access_token)
    const channels = await Channel.find({});
    // const adminChannels = await User.find({});
    res.render('channels.ejs', {channels: channels})
})

module.exports = router