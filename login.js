function login(client, name, prefix, token, config){
    client.on("ready", () => {
        console.log(name + " has connected!");
        client.user.setPresence({
            status: "online",
            game: { name: "My prefix is " + prefix }
        });
    })

    client.login(token)
}

module.exports = login;