const Discord = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a member",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("You don't have `ADMINISTRATOR` permission!");
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("I don't have `ADMINISTRATOR` permission!");
            }

            let userID = args[0];
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) return
                let bUser = bans.find(b => b.user.id == userID);
                if (!bUser) return
                message.guild.members.unban(bUser.user);

                let successfullyembed = new Discord.MessageEmbed()
                    .setTitle(`${userID} has been unbanned from this server`)
                    .setColor("#2C2F33")
                    .setDescription("Welcome back")
                    .setTimestamp();

                message.channel.send(successfullyembed);
            });
        }
    }
}