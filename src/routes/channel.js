const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Channel = require('../models/channel')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

async function validateCookie(req, res, next) {
    const token = req.cookies.access_token
  
    if (token == null) return res.sendStatus(401)
  
    try{
      const decoded = jwt.verify(token, process.env.SALT)
      const email = decoded.email
      next()
  }catch(error){
      return res.json({status:'error', error:'Invalid Token'})
}}

router.get('/', validateCookie, async (req, res) => {
    const token = req.cookies.access_token

    const decoded = jwt.verify(token, process.env.SALT)
    const email = decoded.email
    const username = decoded.name
    const channels = await Channel.find({});

    // If user is Admin DB, provide exghaustive list of channels. If not, provide list of user's channels
    const userQuery = await User.find({email: email})
    let adminChannels
    if (userQuery[0].isDbAdmin == true ) 
        adminChannels = await Channel.find({}, 'name id')  
    else {
        const query = await User.find({email: email}, 'channels')
        adminChannels = query[0].channels
    }
        
    res.render('channels.ejs', {channels: channels, adminChannels: adminChannels, username: username})
})

router.post('/create', validateCookie, async (req, res) => {
    const token = req.cookies.access_token

    const decoded = jwt.verify(token, process.env.SALT)
    const username = decoded.name
    const email = decoded.email
    const channelName = req.body.name

    // Verify that channel name doesn't exist
    const channelNames = await Channel.find({}, 'name')
    if (channelNames.some((obj) => obj.name === channelName))
        return res.json({status:'error', error:'Duplicate channel name'})

    // If user is DB admin, get all users and channels
    const userQuery = await User.findOne({email: email})
    let adminChannels 
    let users
    console.log("User query:" + userQuery)
    if (userQuery.isDbAdmin){
        users = await User.find({}, 'email')
    }
    else {
        users = req.body.users.split(', ')
        users.push(email)
    }
    
    // Create new channel
    await Channel.create({
        name: channelName,
        admin: email,
        users: users,
        messages: []
    })

    // Update user's list of channels 
    if (!userQuery.isDbAdmin){
        const channelQuery = await Channel.findOne({admin: email, name: channelName})
        const channelId = channelQuery._id.toString()
        userQuery.channels.push({name: channelName, id: channelId})
        await userQuery.save()
        adminChannels = userQuery.channels
    } else
        adminChannels = await Channel.find({}, 'name id') 

    console.log("Admin channels: " + adminChannels)
    const channels = await Channel.find({});
    res.render('channels.ejs', {channels: channels, adminChannels: adminChannels, username: username})
})

router.get('/delete/:id', validateCookie, async (req, res) => {
    const token = req.cookies.access_token

    const decoded = jwt.verify(token, process.env.SALT)
    const email = decoded.email
    const username = decoded.name
    const id = req.params.id

    // Delete channel with name and admin equal to email 
    await Channel.findByIdAndDelete(id)

    // Update user's list of channels 
    const userQuery = await User.findOne({email: email})
    // DB Admin 
    let adminChannels 
    if (userQuery.isDbAdmin) 
        adminChannels = await Channel.find({}, 'name id')  
    else {
        userQuery.channels.splice({id: id}, 1)
        await userQuery.save()
        adminChannels = userQuery[0].channels
    }

    // Get channels
    const channels = await Channel.find({});
    res.render('channels.ejs', {channels: channels, adminChannels: adminChannels, username: username})
})

router.get('/:id', validateCookie, async (req, res) => {
    const token = req.cookies.access_token
    const id = req.params.id
    const decoded = jwt.verify(token, process.env.SALT)
    const email = decoded.email
    const name = decoded.name 

    // Get list of users in channel
    const channelQuery = await Channel.findById(id)
    const {users} = channelQuery

    // Confirm user has access to channel
    const userQuery = await User.findOne({email: email})
    if (userQuery.isDbAdmin) 
        res.render('channel.ejs', {channel:channelQuery, username: name})
    
    else if (!users.includes(email))
        res.send("Unauthorized to access this channel")
    else {
        res.render('channel.ejs', {channel:channelQuery, username: name})
    }
})

module.exports = router