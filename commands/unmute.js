const Discord = require("discord.js");
const { PREFIX } = require("../util/util");

module.exports = {
    name: 'unmute',
    description: 'Unmute user yang di mention',
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

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(orangRole.id);
                message.channel.send(`<@${memberTarget.user.id}> telah di Unmute!`);
            } else {
                message.channel.send('Tidak dapat menemukan user tersebut!');
            }
        }
    }
}