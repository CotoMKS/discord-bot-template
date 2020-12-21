const Discord = require('discord.js');
module.exports = {
    name: "addnick",
    aliases: ["nick"],
    description: "Memberi nickname pada member yang di Mention",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            if (!message.member.permissions.has("MANAGE_NICKNAME")) return message.reply('Anda tidak memiliki izin `MANAGE_NICKNAME`');
            const member = message.mentions.members.first();
            if (!member) return message.channel.send('Siapa yang ingin anda beri Nickname?');
            if (!args.slice(1).join(" ")) return message.reply(`Nickname apa yang ingin anda berikan pada ${member}?`);
            member.setNickname(args.slice(1).join(" ")), message.channel.send(`Berhasil mengganti nickname ${member.user.tag} menjadi ${args.slice(1).join(" ")}`);
        }
    }
}