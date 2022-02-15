// Import Libraries, Modules, & Middlewares
const mongoose = require('mongoose');

// Declare Database Local URL Variable
const DB_URI = 'mongodb://localhost:27017/chatportal';

// Connect to Database
const connect = mongoose.connect(DB_URI, { useNewUrlParser: true });

// Export Connection Externally
module.exports = connect;