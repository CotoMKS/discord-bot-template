exports.canModifyQueue = (member) => {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
        message.channel.send("Must connected to a Voice Channel!").catch(console.error);
        return;
    }

    return true;
};

let config;

try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.TOKEN = `${process.env.BOT_TOKEN}`;
exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
exports.YOUTUBE_API_KEY = `${process.env.YOUTUBE_API_KEY}`;
exports.MAX_PLAYLIST_SIZE = config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE;
exports.PRUNING = config ? config.PRUNING : process.env.PRUNING;
exports.STAY_TIME = config ? config.STAY_TIME : process.env.STAY_TIME;
exports.DEFAULT_VOLUME = config ? config.DEFAULT_VOLUME : process.env.DEFAULT_VOLUME;