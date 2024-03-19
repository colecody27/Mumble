const mongoose = require("mongoose");
const { Schema } = mongoose;

const channel = new Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
});

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    admin: { type: String, required: true },
    users: [
      {
        isDatabaseAdmin: { type: Boolean, required: true },
        isChannelAdmin: { type: Boolean, required: true },
      },
    ],
    messages: { type: [channel], required: false },
  },
  {
    collection: "channels",
  }
);

const Channel = new mongoose.model("Channel", channelSchema);

module.exports = Channel;
