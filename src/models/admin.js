const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/user");

const channel = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["databaseAdmin", "channelAdmin"],
      required: true,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channels",
      },
    ],
    canDeleteAnyChannels: { type: Boolean, required: true },
    canAddUsers: { type: Boolean, required: true },
  },
  {
    collection: "admins",
  }
);

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
