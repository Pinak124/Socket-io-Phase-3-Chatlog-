// Import Libraries, Modules, & Middlewares
const mongoose = require('mongoose');

// Create Schema
const Schema = mongoose.Schema;

// Define Chat Schema
const chatSchema = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    createdDate : { type: Date, default: Date.now() },
});

// Export Model Externally
let  Chat  =  mongoose.model('Chat', chatSchema);
module.exports  =  Chat;