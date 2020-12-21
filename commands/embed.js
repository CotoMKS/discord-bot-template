const Discord = require("discord.js");

module.exports = {
    name: 'embed',
    description: 'Menampilkan embed message yang berisi link server ini dan link ke repository github CotoMKS27 (Khusus untuk kalian yang ingin membuat bot Discord)',
    async execute(message, args) {
        var embed = new Discord.MessageEmbed()
            .setColor("#32aabe")
            .setTitle("Embed Message")
            .setDescription("Permanent Invite Link ke Server ini :\n``https://discord.gg/mTZj7gz2f4``\n\n\nLink untuk Bot Template : \n``https://github.com/CotoMKS/discord-bot-template``\nUntuk petunjuk penginstalan template bot dari CotoMKS27, klik link di bawah untuk pergi ke Website Hikawa Sayo. Jika ada masalah, silahkan kontak `CotoMKS27#9361` untuk mendapat bantuan seputar bot programming\n\n\nLink untuk Hikawa Sayo website :\n``hikawa-sayo.netlify.app``\n\n\n")
            .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361');

        message.channel.send(embed);
    }
}