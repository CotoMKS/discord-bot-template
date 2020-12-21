const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    description: "Tampilkan lagu yang sedang dimainkan",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);

            const song = queue.songs[0];
            const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
            const left = song.duration - seek;

            let nowPlaying = new MessageEmbed()
                .setTitle("🎵--Sedang Diputar--🎵")
                .setDescription(`${song.title}\n${song.url}`)
                .setColor("#32aabe")
                .setAuthor(message.client.user.username);

            if (song.duration > 0) {
                nowPlaying.addField(
                    "\u200b",
                    new Date(seek * 1000).toISOString().substr(11, 8) +
                    "[" +
                    createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
                    "]" +
                    (song.duration == 0 ? " ◉ PLAYING" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
                    false
                );
                nowPlaying.setFooter("Sisa Waktu: " + new Date(left * 1000).toISOString().substr(11, 8));
                nowPlaying.setFooter('Hikawa Sayo | Made by : CotoMKS27#9361');
            }

            return message.channel.send(nowPlaying);
        }
    }
}