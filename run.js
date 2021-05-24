const bot = require('./bot.js')
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB

console.log('Waking up the maids')
//coment
new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)