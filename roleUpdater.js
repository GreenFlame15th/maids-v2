async function login(user, fusionRoles, roles, log) {

    if (user.user.bot) {
        return
    }
    else if (!user.roles.cache.map(r => r.id).includes(roles.verify)) {
        return;
    }
    else {

    const userRoles = await user.roles.cache
    const userRoleIds = await userRoles.array().map(r => r.id)
    const guildRoles = await user.guild.roles.cache


    let nsfw = false
    fusionRoles.nsfw
        .forEach(r => {
            if (userRoleIds.includes(r)) {
                nsfw = true
            }
        })

    function addById(id) {
        if (!userRoleIds.includes(id) && id.length === 18)
            user.roles.add(guildRoles.get(id))
                .then(log.send("Added **" + guildRoles.get(id).name + "** to <@" + user.id + ">"))
                .catch(err => console.log("RoleUpdater, adding " + id + " to " + user.nickname + ": " + err))
    }

    function removeById(id) {
        if (userRoleIds.includes(id) && id.length === 18)
            user.roles.remove(guildRoles.get(id))
                .then(log.send("Removed **" + guildRoles.get(id).name + "** from <@" + user.id + ">"))
                .catch(err => console.log("RoleUpdater, removing " + id + " from " + user.nickname + ": " + err))
    }

    //nsfw fusion
    if (nsfw) {
        fusionRoles.nsfwFusion.forEach(fu => {
            if (userRoleIds.includes(fu[0])) {
                addById(fu[1])
            } else if (!userRoleIds.includes(fu[0])) {
                removeById(fu[1])
            }
        })
    } else
        fusionRoles.nsfwFusion.forEach(fu => {
            if (userRoleIds.includes(fu[1])) {
                removeById(fu[1])
            }
        })
    //vvv here goes date/fusion role handler vvv
    fusionRoles.fusion.forEach(f => {
        if (f[1].every(r => userRoleIds.includes(r))) {
            addById(f[0])
        } else {
            removeById(f[0])
        }
    })
}}
module.exports = login;