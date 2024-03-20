const mongoose = require('mongoose')
const { Schema } = mongoose;

const channel = new Schema({
    name: {type: String, required: true}, 
    id: {type: String, required: true}, 
})

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    channels: {type: [channel], required: false},
    isDbAdmin: {type: Boolean, required: false, default: false} 
    },{
    collection: 'users'
})

const User = new mongoose.model('User', userSchema)

module.exports = User