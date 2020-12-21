module.exports = {
    name: "stop",
    description: "Stop the song",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const queue = message.client.queue.get(message.guild.id);

            if (!queue) return message.reply("There is no song in queue!").catch(console.error);
            if (!canModifyQueue(message.member)) return;

            queue.songs = [];
            queue.connection.dispatcher.end();
            queue.textChannel.send("Queue Stopped...").catch(console.error);
        }
    }
}