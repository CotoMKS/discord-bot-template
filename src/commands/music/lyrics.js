const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    description: "Find the lyrics of the currently playing song",
    async execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("There is no song in queue").catch(console.error);

            let lyrics = null;

            try {
                lyrics = await lyricsFinder(queue.songs[0].title, "");
                if (!lyrics) lyrics = `Can't find lyrics for ${queue.songs[0].title}.`;
            } catch (error) {
                lyrics = `Can't find lyrics for ${queue.songs[0].title}.`;
            }

            let lyricsEmbed = new MessageEmbed()
                .setTitle(`${queue.songs[0].title} — Lyrics`)
                .setDescription(lyrics)
                .setColor("#32aabe");

            if (lyricsEmbed.description.length >= 2048)
                lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return message.channel.send(lyricsEmbed).catch(console.error);
        }
    }
}