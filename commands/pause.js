const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "pause",
    description: "Pause lagu yang sedang dimainkan",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
            if (!canModifyQueue(message.member)) return;

            if (queue.playing) {
                queue.playing = false;
                queue.connection.dispatcher.pause(true);
                return queue.textChannel.send(`⏸ Pause!`).catch(console.error);
            }
        }
    }
}