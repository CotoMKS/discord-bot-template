const { play } = require("../../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const https = require("https");
const { YOUTUBE_API_KEY, DEFAULT_VOLUME } = require("../../util/util");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
    name: "play",
    cooldown: 5,
    description: "Play song from Youtube URL",
    async execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const { channel } = message.member.voice;

            const serverQueue = message.client.queue.get(message.guild.id);
            if (!channel) return message.reply("You must connected to voice channel").catch(console.error);
            if (serverQueue && channel !== message.guild.me.voice.channel)
                return message.reply(`You must connected to the same voice channel as ${message.client.user}`).catch(console.error);

            if (!args.length)
                return message
                    .reply(`Cara Pakai : ${message.client.prefix}play <YouTube URL>`)
                    .catch(console.error);

            const permissions = channel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT"))
                return message.reply("Can't connect to voice channel");
            if (!permissions.has("SPEAK"))
                return message.reply("Can't play the song");

            const search = args.join(" ");
            const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
            const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
            const url = args[0];
            const urlValid = videoPattern.test(args[0]);

            if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
                return message.client.commands.get("playlist").execute(message, args);
            }

            const queueConstruct = {
                textChannel: message.channel,
                channel,
                connection: null,
                songs: [],
                loop: false,
                volume: DEFAULT_VOLUME || 100,
                playing: true
            };

            let songInfo = null;
            let song = null;

            if (urlValid) {
                try {
                    songInfo = await ytdl.getInfo(url);
                    song = {
                        title: songInfo.videoDetails.title,
                        url: songInfo.videoDetails.video_url,
                        duration: songInfo.videoDetails.lengthSeconds
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            } else {
                try {
                    const results = await youtube.searchVideos(search, 1);
                    songInfo = await ytdl.getInfo(results[0].url);
                    song = {
                        title: songInfo.videoDetails.title,
                        url: songInfo.videoDetails.video_url,
                        duration: songInfo.videoDetails.lengthSeconds
                    };
                } catch (error) {
                    console.error(error);
                    return message.reply(error.message).catch(console.error);
                }
            }

            if (serverQueue) {
                serverQueue.songs.push(song);
                return serverQueue.textChannel
                    .send(`**${message.author}** has add **${song.title}**`)
                    .catch(console.error);
            }

            queueConstruct.songs.push(song);
            message.client.queue.set(message.guild.id, queueConstruct);

            try {
                queueConstruct.connection = await channel.join();
                await queueConstruct.connection.voice.setSelfDeaf(true);
                play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(error);
                message.client.queue.delete(message.guild.id);
                await channel.leave();
                return message.channel.send(`Can't connect to voice channel. Reason : ${error}`).catch(console.error);
            }
        }
    }
}