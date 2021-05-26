const bot = require('./bot.js')
const express = require("express");
const app = express();
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB

console.log('Waking up the maids')

new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)

//keep the bot doing something to prevent time out
/*
async function bump() {
    setTimeout(() => {
        bump();
        console.log("bump");
    }, 60 * 1000);
}
bump()
 */