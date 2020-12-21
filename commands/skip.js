const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "skip",
    description: "Skip lagu yang sedang dimainkan",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue)
            return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;

        queue.playing = true;
        queue.connection.dispatcher.end();
        queue.textChannel.send("Skip ke lagu selanjutnya....").catch(console.error);
    }
};