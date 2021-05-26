const bot = require('./bot.js')
const express = require("express");
const app = express();
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB

console.log('Waking up the maids')

new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)
