const Discord = require("discord.js");
const { PREFIX } = require("../../util/util");

module.exports = {
    name: 'ban',
    description: 'Ban member',
    async execute(message, client) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {

            let args = message.content.substring(PREFIX.length).split(" ");
            let banned = message.mentions.users.first();
            let reason = args.slice(2).join(" ");

            if (!message.member.permissions.has("ADMINISTRATOR")) {
                message.channel.send("You don't have `ADMINISTRATOR` Permission");

                return;
            }

            if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
                message.channel.send("I don't have `ADMINISTRATOR` Permission");

                return;
            }

            if (!banned) {
                message.reply(`How to use : ${PREFIX}ban <member name> <reason>`);

                return;
            }

            if (message.author === banned) {
                message.reply("Can't ban yourself!");
                return;
            }

            if (!reason) {
                message.reply(`How to use : ${PREFIX}ban <member name> <reason>`);
                return;
            }

            message.guild.members.ban(banned, { reason: reason });

            let successfullyembed = new Discord.MessageEmbed()
                .setTitle(`${banned.tag} has been *Banned* from this Server`)
                .setColor("#32aabe")
                .setDescription(`Reason : ${reason}`)
                .setTimestamp();

            message.channel.send(successfullyembed);
        }
    }
}