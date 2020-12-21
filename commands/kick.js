const PREFIX = require('../util/util');
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Mengeluarkan member yang di mention",
    execute(message) {


        let args = message.content.substring(PREFIX.length).split(" ");

        if (!args[1]) message.reply('Siapa yang ingin anda Kick?');

        const user = message.mentions.users.first();


        if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.channel.send("Anda tidak memiliki izin `KICK_MEMBERS`");
        } else if (user) {
            var anggota = message.member.guild.member(user);

            if (anggota) {
                anggota.kick('Anda telah dikeluarkan dari server ini...').then(() => {
                    let kickEmbed = new Discord.MessageEmbed()
                        .setTitle("Member kick")
                        .setColor("#32aabe")
                        .setThumbnail(anggota.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setDescription(`${message.author.tag} telah mengeluarkan ${anggota.user.tag}`)
                        .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361')
                        .setTimestamp();

                    message.channel.send(kickEmbed);
                }).catch(err => {
                    message.reply("Tidak dapat mengeluarkan member ini");
                    console.log(err);
                });
            } else {
                message.reply("Tidak dapat menemukan member ini....");
            }
        } else {
            message.reply("Tidak dapat menemukan member ini....");
        }
    }
}