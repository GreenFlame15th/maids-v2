const bot = require('./bot.js')
require('dotenv').config('/.env')
const tokenGreen = process.env.TOKENG
const tokenBlue = process.env.TOKENB

console.log('Waking up the maids')

new bot('./green', tokenGreen)
new bot('./blue', tokenBlue)


//keep the bot doing something to prevent time out
async function boop() {
  setTimeout(() => {
    boop();
    console.log("boop");
  }, 60 * 1000);
}
