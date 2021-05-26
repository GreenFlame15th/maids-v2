const bot = require('./bot.js')
const express = require("express");
const app = express();
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB
const PORT = process.env.PORT || 8000;
app.listen(PORT, function(err) {
    if (err) {
        console.log("app.listen error: " + err);
        return;
    }
    console.log('listening on port 8000');
});

console.log('Waking up the maids')

new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)