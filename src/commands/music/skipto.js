const { canModifyQueue } = require("../../util/util");

module.exports = {
    name: "skipto",
    description: "Skip to selected song",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            if (!args.length || isNaN(args[0]))
                return message
                    .reply(`How to use : ${message.client.prefix}${module.exports.name} <queue number>`)
                    .catch(console.error);

            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("There is no song in queue!").catch(console.error);
            if (!canModifyQueue(message.member)) return;
            if (args[0] > queue.songs.length)
                return message.reply(`Queue only have ${queue.songs.length} song(s)`).catch(console.error);

            queue.playing = true;

            if (queue.loop) {
                for (let i = 0; i < args[0] - 2; i++) {
                    queue.songs.push(queue.songs.shift());
                }
            } else {
                queue.songs = queue.songs.slice(args[0] - 2);
            }

            queue.connection.dispatcher.end();
            queue.textChannel.send(`Skip to queue number ${args[0]}....`).catch(console.error);
        }
    }
}