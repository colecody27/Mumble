const express = require("express");
const router = express.Router();
const { User, addAdminRole } = require("../models/user");
const Channel = require("../models/channel");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function validateCookie(req, res, next) {
  const token = req.cookies.access_token;
  //const role = req.cookies.role;

  //req.user = { role };

  /*if (admin.role === "databaseAdmin") {
    next();
  } else if (admin.role === "channelAdmin") {
    next();
  } else {
    if (token == null) return res.sendStatus(401);
*/
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    next();
  } catch (error) {
    return res.json({ status: "error", error: "Invalid Token" });
  }
}
//}

async function validateChannel(req, res, next) {
  const token = req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;

    next();
  } catch (error) {
    return res.json({ status: "error", error: "Invalid access to channel" });
  }
}

router.get("/", validateCookie, async (req, res) => {
  const token = req.cookies.access_token;

  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;
  const username = decoded.name;

  // Get channels
  const adminChannels = await User.find({ email: email }, "channels");
  const channels = await Channel.find({});

  res.render("channels.ejs", {
    channels: channels,
    adminChannels: adminChannels[0].channels,
    username: username,
  });
});

router.post("/create", validateCookie, async (req, res) => {
  const token = req.cookies.access_token;

  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;

  // Get list of users and add admins
  const users = req.body.users.split(", ");
  users.push("colecody27@gmail.com");
  users.push(email);

  // Seperate users on commas
  await Channel.create({
    name: req.body.name,
    admin: email,
    users: users,
    messages: [],
  });

  // Update user's list of channels
  const userDoc = await User.findOne({ email: email });
  const channelQuery = await Channel.findOne({
    admin: email,
    name: req.body.name,
  });
  const channelId = channelQuery._id.toString();
  userDoc.channels.push({ name: req.body.name, id: channelId });
  await userDoc.save();

  // Get channels
  const adminChannels = await User.find({ email: email }, "channels");
  const channels = await Channel.find({});

  res.render("channels.ejs", {
    channels: channels,
    adminChannels: adminChannels[0].channels,
  });
});

router.get("/delete/:id", validateCookie, async (req, res) => {
  const token = req.cookies.access_token;

  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;
  const id = req.params.id;

  // Delete channel with name and admin equal to email
  await Channel.findByIdAndDelete(id);

  // Update user's list of channels
  const userDoc = await User.findOne({ email: email });
  userDoc.channels.splice({ id: id }, 1);
  await userDoc.save();

  // Get channels
  const adminChannels = await User.find({ email: email }, "channels");
  const channels = await Channel.find({});

  res.render("channels.ejs", {
    channels: channels,
    adminChannels: adminChannels[0].channels,
  });
});

router.get("/:id", validateCookie, async (req, res) => {
  const token = req.cookies.access_token;
  const id = req.params.id;

  // Confirm user has access to channel
  const channelQuery = await Channel.findById(id);
  const { users } = channelQuery;
  const decoded = jwt.verify(token, "secret123");
  const email = decoded.email;
  const name = decoded.name;
  console.log(channelQuery);
  if (!users.includes(email)) res.send("Unauthorized to access this channel");
  else {
    res.render("channel.ejs", { channel: channelQuery, username: name });
  }
});

module.exports = router;
