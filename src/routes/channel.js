const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Channel = require('../models/channel')
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const channels = await Channel.find({});
    res.render('channels.ejs', {channels: channels})
})

module.exports = router