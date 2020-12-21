const Discord = require("discord.js");
const { PREFIX } = require("../util/util");

module.exports = {
    name: 'unmute',
    description: 'Unmute a user',
    async execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const target = message.mentions.users.first();

            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("You don't have `MANAGE_ROLES` permission!");

            if (target) {
                let memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

                let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(memberRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmute!`);
            } else {
                message.channel.send("Can't find this user");
            }
        }
    }
}