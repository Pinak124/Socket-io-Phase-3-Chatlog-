// Import Libraries, Modules, & Middlewares
const express = require('express');
const Chat = require('../models/chat-model');
const dbConnect = require('../dbConnect');

// Define app Object
const app = express();

// Use express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST Chat Message to Database
exports.saveChatMessage = (req, res, next) => {
    try {
        const chat = new Chat(req.body);
        chat.save();
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
};

// GET Chat Messages by Username
exports.getChatMessagesByUser = (req, res, next) => {
    console.log("chats: ");
    try {
        console.log('username:: ' + req.params.username);
        if (req.params.username) {
            
            const query = { username: req.params.username };
            dbConnect.then(db => {
                    Chat.find(query).then(chats => {
                    res.json(chats);
                 //   console.log("chats: "+chats);
                });
            });
        }
    } catch (error) {
        res.sendStatus(500);
        console.error(error);
    }
};