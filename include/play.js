const ytdl = require("erit-ytdl");
const { canModifyQueue, STAY_TIME } = require("../util/util");

module.exports = {
    async play(song, message) {
        const {} = require("../util/util");

        let config;

        try {
            config = require("../config.json");
        } catch (error) {
            config = null;
        }

        const PRUNING = config ? config.PRUNING : process.env.PRUNING;

        const queue = message.client.queue.get(message.guild.id);

        if (!song) {
            setTimeout(function() {
                if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
                queue.channel.leave();
                queue.textChannel.send("Keluar dari Voice Channel....");
            }, STAY_TIME * 1000);
            queue.textChannel.send("Antrian dihentikan....").catch(console.error);
            return message.client.queue.delete(message.guild.id);
        }

        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

        try {
            if (song.url.includes("youtube.com")) {
                stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
            }
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            console.error(error);
            return message.channel.send(`Error: ${error.message ? error.message : error}`);
        }

        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

        const dispatcher = queue.connection
            .play(stream, { type: streamType })
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop();

                if (queue.loop) {
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message);
                } else {
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                }
            })
            .on("error", (err) => {
                console.error(err);
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            });
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        try {
            var playingMessage = await queue.textChannel.send(`Sedang diputar : **${song.title}** ${song.url}`);
            await playingMessage.react("⏭");
            await playingMessage.react("⏯");
            await playingMessage.react("🔉");
            await playingMessage.react("🔊");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");
        } catch (error) {
            console.error(error);
        }

        const filter = (reaction, user) => user.id !== message.client.user.id;
        var collector = playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        });

        collector.on("collect", (reaction, user) => {
            if (!queue) return;
            const member = message.guild.member(user);

            switch (reaction.emoji.name) {
                case "⏭":
                    queue.playing = true;
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.connection.dispatcher.end();
                    queue.textChannel.send(`⏭ Lagu di Skip oleh : ${message.author}`).catch(console.error);
                    collector.stop();
                    break;

                case "⏯":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    if (queue.playing) {
                        queue.playing = !queue.playing;
                        queue.connection.dispatcher.pause(true);
                        queue.textChannel.send(`⏸ Lagu di Pause oleh : ${message.author}`).catch(console.error);
                    } else {
                        queue.playing = !queue.playing;
                        queue.connection.dispatcher.resume();
                        queue.textChannel.send(`▶ Lagu di Resume oleh ${message.author}`).catch(console.error);
                    }
                    break;

                case "🔉":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member) || queue.volume == 0) return;
                    if (queue.volume - 10 <= 0) queue.volume = 0;
                    else queue.volume = queue.volume - 10;
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                    queue.textChannel
                        .send(`🔉 Volume saat ini : **${queue.volume}%**`)
                        .catch(console.error);
                    break;

                case "🔊":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member) || queue.volume == 100) return;
                    if (queue.volume + 10 >= 100) queue.volume = 100;
                    else queue.volume = queue.volume + 10;
                    queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
                    queue.textChannel
                        .send(`🔊 Volume saat ini : **${queue.volume}%**`)
                        .catch(console.error);
                    break;

                case "🔁":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.loop = !queue.loop;
                    queue.textChannel.send(`Mengulangi Antrian : ${queue.loop ? "**on**" : "**off**"}`).catch(console.error);
                    break;

                case "⏹":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.songs = [];
                    queue.textChannel.send(`⏹ Antrian di Hentikan Oleh : ${message.author}`).catch(console.error);
                    try {
                        queue.connection.dispatcher.end();
                    } catch (error) {
                        console.error(error);
                        queue.connection.disconnect();
                    }
                    collector.stop();
                    break;

                default:
                    reaction.users.remove(user).catch(console.error);
                    break;
            }
        });

        collector.on("end", () => {
            playingMessage.reactions.removeAll().catch(console.error);
            if (PRUNING && playingMessage && !playingMessage.deleted) {
                playingMessage.delete({ timeout: 3000 }).catch(console.error);
            }
        });
    }
};