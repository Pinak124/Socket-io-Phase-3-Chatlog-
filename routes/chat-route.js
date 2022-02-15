// Import Libraries, Modules, & Middlewares
const express = require('express');
const chatContoller = require('../controllers/chat-controller');

// Create Router
const router = express.Router();

// Redirect to Home page
router.get('/', function(req, res) {
    res.redirect('/');
});

// POST Chat Message
router.post('/', chatContoller.saveChatMessage);
// GET Chat Messages by Username
router.get('/:username', chatContoller.getChatMessagesByUser);

// Export Routers Externally
module.exports = router;