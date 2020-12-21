const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "resume",
    aliases: ["r"],
    description: "Lanjutkan lagu yang sedang dimainkan",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;

        if (!queue.playing) {
            queue.playing = true;
            queue.connection.dispatcher.resume();
            return queue.textChannel.send('▶ Melanjutkan....').catch(console.error);
        }

        return message.reply("Antrian tidak di Pause").catch(console.error);
    }
};