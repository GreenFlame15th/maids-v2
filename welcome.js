const randomInt = require("./randomeInt.js");

function welcome(message, channales, roles, config, welcomes, general) {

    //check if applicable
    if (message.channel.id !== channales.welcome && message.channel.id !== channales.test) {return;}
    if (!message.content.toLowerCase().startsWith(config.welcome)) {return;}
    if (message.mentions.users.array().length === 0) {
        message.channel.send("Please mention people you wish to welcome.");
        return false;
    }

    const authorRoles = message.member.roles.cache.map(r => r.id)

    if (authorRoles.includes(roles.admin) || authorRoles.includes(roles.mod) || authorRoles.includes(roles.welcomer)
        || message.member.hasPermission("MANAGE_ROLES")) {

        message.channel.send("Welcoming in progress: this may take a few seconds.")
        //find welcome role pool
        let guildRoles = message.guild.roles.cache
        let apply = []
        apply.push(roles.verify)
        if (message.content.toLowerCase().includes(config.above))
            {apply.push(roles.above18)}
        else {apply.push(roles.below18)}
        roles.separators.forEach(r => apply.push(r))

        message.mentions.members.array().forEach(m =>{
            apply.filter(r => r !== "").map(r => guildRoles.get(r)).forEach(r =>{
                m.roles.add(r, "Welcomed by " + message.member.name + "(" + message.member.id + ")")
                    .catch(err => {
                        console.log("Error (while adding "+ r.name +"): " + err)
                        message.channel.send("Error (while adding "+ r.name +"): " + err)
                    })
                })
                general.send(
                    welcomes[randomInt(0,welcomes.length)]
                    .replace('<@>',"<@"+m.id+">")
                    .replace("<#>","<#"+channales.selfRole+">")
                )
                .catch(err => console.log("Error has accrued welcoming " + m.displayName + ": " + err))
            }
        )
        message.channel.send("Welcoming message send")
        return true;

    }
    else
        message.channel.send("Missing permission")
    return false;
}
module.exports = welcome;