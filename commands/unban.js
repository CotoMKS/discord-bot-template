const Discord = require("discord.js");

module.exports = {
    name: "unban",
    description: "Melepaskan status Banned dari member yang telah di Ban",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Anda tidak memiliki izin `ADMINISTRATOR`");
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Anda tidak memiliki izin `ADMINISTRATOR`");
            }

            let userID = args[0];
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) return
                let bUser = bans.find(b => b.user.id == userID);
                if (!bUser) return
                message.guild.members.unban(bUser.user);

                let warna = "#2C2F33";
                let successfullyembed = new Discord.MessageEmbed()
                    .setTitle(`${userID} telah di Unban dari server ini`)
                    .setColor(warna)
                    .setDescription("Jangan lakukan kesalahan yang sama lagi!")
                    .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361')
                    .setTimestamp();

                message.channel.send(successfullyembed);
            });
        }
    }
}