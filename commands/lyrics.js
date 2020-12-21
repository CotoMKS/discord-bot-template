const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    aliases: ["lirik"],
    description: "Mencari dan menampilkan lirik dari lagu yang sedang dimainkan",
    async execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("Tidak ada lagu yang sedang dimainkan").catch(console.error);

            let lyrics = null;

            try {
                lyrics = await lyricsFinder(queue.songs[0].title, "");
                if (!lyrics) lyrics = `Tidak dapat menemukan lirik untuk ${queue.songs[0].title}.`;
            } catch (error) {
                lyrics = `Tidak dapat menemukan lirik untuk ${queue.songs[0].title}.`;
            }

            let lyricsEmbed = new MessageEmbed()
                .setTitle(`${queue.songs[0].title} — Lyrics`)
                .setDescription(lyrics)
                .setColor("#32aabe")
                .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361');

            if (lyricsEmbed.description.length >= 2048)
                lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return message.channel.send(lyricsEmbed).catch(console.error);
        }
    }
}