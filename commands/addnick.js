const { PREFIX } = require("../util/util");

const { PREFIX } = require('../util/util');

module.exports = {
    name: "addnick",
    aliases: ["nick"],
    description: "Give nickname to mentioned user",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "YOUR BOT COMMAND CHANNEL"); //Change it to your actual bot command channel

        //If this command executed outside botCommandChannel, the command will not be executed
        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            if (!message.member.permissions.has("MANAGE_NICKNAME")) return message.reply("You don't have `MANAGE_NICKNAME` Permission");
            const member = message.mentions.members.first();
            if (!member) return message.channel.send(`How to use : ${PREFIX}addnick <member name> <nickname>`);
            if (!args.slice(1).join(" ")) return message.reply(`How to use : ${PREFIX}addnick <member name> <nickname>`);
            member.setNickname(args.slice(1).join(" ")), message.channel.send(`Successfully change ${member.user.tag} nickname to ${args.slice(1).join(" ")}`);
        }
    }
}