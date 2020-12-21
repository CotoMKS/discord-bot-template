const Discord = require("discord.js");
const { PREFIX } = require("../util/util");

module.exports = {
    name: 'ban',
    description: 'Banned member',
    async execute(message, client) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {

            let args = message.content.substring(PREFIX.length).split(" ");
            let banned = message.mentions.users.first();
            let reason = args.slice(1).join(" ");

            if (!message.member.permissions.has("ADMINISTRATOR")) {
                message.channel.send("Anda tidak memiliki izin `ADMINISTRATOR`");

                return;
            }

            if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
                message.channel.send("Saya tidak memiliki izin `ADMINISTRATOR`");

                return;
            }

            if (!banned) {
                message.reply("Siapa yang ingin anda Ban?");

                return;
            }

            if (message.author === banned) {
                message.reply("Tidak dapat melakukan Ban ke diri sendiri....");
                return;
            }

            if (!reason) {
                message.reply("Mengapa anda melakukan Ban pada user ini");
                return;
            }

            message.guild.members.ban(banned, { reason: reason });

            let successfullyembed = new Discord.MessageEmbed()
                .setTitle(`${banned.tag} telah di Ban dari server ini`)
                .setColor("#32aabe")
                .setDescription(`Karena : ${reason}`)
                .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361')
                .setTimestamp();

            message.channel.send(successfullyembed);
        }
    }
}