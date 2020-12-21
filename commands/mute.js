const Discord = require("discord.js");
const { PREFIX } = require("../util/util");
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mute user yang di mention',
    async execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            const target = message.mentions.users.first();

            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Anda tidak memiliki izin `MANAGE_ROLES`");

            if (target) {
                let orangRole = message.guild.roles.cache.find(role => role.name === 'Orang');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Diam!');

                let memberTarget = message.guild.members.cache.get(target.id);

                if (!args[1]) {
                    memberTarget.roles.remove(orangRole.id);
                    memberTarget.roles.add(muteRole.id);
                    message.channel.send(`<@${memberTarget.user.id}> telah di Mute!`);

                    return
                }

                memberTarget.roles.remove(orangRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> telah di Mute selama ${ms(ms(args[1]))}`);

                setTimeout(function() {
                    memberTarget.roles.remove(muteRole.id);
                    memberTarget.roles.add(orangRole.id);
                }, ms(args[1]));

            } else {
                message.channel.send('Tidak dapat menemukan user tersebut!');
            }
        }
    }
}