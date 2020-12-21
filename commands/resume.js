const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "resume",
    aliases: ["r"],
    description: "Resume the paused song",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.reply("There is no song in queue!").catch(console.error);
            if (!canModifyQueue(message.member)) return;

            if (!queue.playing) {
                queue.playing = true;
                queue.connection.dispatcher.resume();
                return queue.textChannel.send('Resume....').catch(console.error);
            }

            return message.reply("Queue is not paused!").catch(console.error);
        }
    }
}