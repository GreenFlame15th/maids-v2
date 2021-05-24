//bot stuff
const Discord = require("discord.js");
const fs = require("fs");
//module
const login = require('./login')
const welcome = require('./welcome')
const roleUpdater = require('./roleUpdater')

class bot{
  constructor(dir, token) {
    {
      //get files
      const channals = JSON.parse(fs.readFileSync(dir + "/channals.json"))
      const config = JSON.parse(fs.readFileSync(dir + "/config.json"))
      const roles = JSON.parse(fs.readFileSync(dir + "/roles.json"))
      const welcomes = JSON.parse(fs.readFileSync(dir + "/welcomes.json"))
      const fusionRoles = JSON.parse(fs.readFileSync(dir + "/fusionRoles.json"))
      const client = new Discord.Client();
      //boot up
      console.log('Booting up ' + config.name)
      login(client, config.name, config.prefix, token, config)
      //message handler
      client.on("ready", () => {
        console.log("Logged in as: "+ client.user.tag)
        //get guild set up
        function getMainGuil(){
          const guilds = client.guilds.cache
          if (config.mainGuild === "") return guilds.first()
          if (guilds.array().includes(config.mainGuild)) return guilds.get(config.mainGuild)
          return guilds.first()
        }
        const guild = getMainGuil()
        //get channales
        const log = guild.channels.cache.get(channals.log)
        const test = guild.channels.cache.get(channals.test)
        const general = guild.channels.cache.get(channals.general)

        client.on("message", message => {
          //no reply to bots
          if (message.author.bot === true) {
            return;
          }
          //protocoles
          welcome(message, channals, roles, config, welcomes, general)
        })
        //role updater
        client.on("guildMemberUpdate", (before, after) => {
          roleUpdater(after, fusionRoles, log)
        })
        //Maid says hello
        console.log(config.name + ' is fully deployed to ' + guild.name + '.')
        test.send(config.name + ' reporting for duty.')
        guild.members.cache.forEach(m=> roleUpdater(m, fusionRoles, roles, log))
      })
    }
  }
}

module.exports = bot;