const PREFIX = require("../../util/util");
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kick a member",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {

            let args = message.content.substring(PREFIX.length).split(" ");

            if (!args[1]) message.reply(`How to use : ${PREFIX}kick <member name>`);

            const user = message.mentions.users.first();


            if (!message.member.permissions.has("KICK_MEMBERS")) {
                message.channel.send("You don't have `KICK_MEMBERS` permission");
            } else if (user) {
                var target = message.member.guild.member(user);

                if (target) {
                    target.kick("You've been kick from this server").then(() => {
                        let kickEmbed = new Discord.MessageEmbed()
                            .setTitle("Member kick")
                            .setColor("#32aabe")
                            .setThumbnail(target.user.displayAvatarURL({ format: 'png', dynamic: true }))
                            .setDescription(`${message.author.tag} has Kick ${target.user.tag} from this server`)
                            .setTimestamp();

                        message.channel.send(kickEmbed);
                    }).catch(err => {
                        message.reply("Can't kick this member");
                        console.log(err);
                    });
                } else {
                    message.reply("Can't find this member");
                }
            } else {
                message.reply("Can't find this member");
            }
        }
    }
}