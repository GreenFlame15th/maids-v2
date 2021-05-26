const bot = require('./bot.js')
const express = require("express");
const app = express();
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB
const port = process.env.PORT || 8000;
app.listen(port, function(err) {
    if (err) {
        console.log("app.listen error: " + err);
        return;
    }
    console.log('listening on port ' + port);
});
//ping handler
app.get("/", (request, response) => {
    console.log("Ping received!");
    response.sendStatus(200);
});

console.log('Waking up the maids')

new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)