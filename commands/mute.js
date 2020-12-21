const Discord = require("discord.js");
const { PREFIX } = require("../util/util");
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mute a member',
    async execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const target = message.mentions.users.first();

            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("You don't have `MANAGE_ROLES` permission!");

            if (target) {
                let memberRole = message.guild.roles.cache.find(role => role.name === 'Member'); //Change this to your actual default role
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); //Change this to your actual mute role

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.remove(memberRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> has been muted!`);

                    return
                }

                memberTarget.roles.remove(memberRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

                setTimeout(function() {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(memberRole.id);
                }, ms(args[1]));

            } else {
                message.channel.send("Can't find this user");
            }
        }
    }
}