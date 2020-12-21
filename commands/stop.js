const { canModifyQueue, STAY_TIME } = require("../util/util");

module.exports = {
    name: "stop",
    description: "Jangan digunakan untuk memicu perang dunia ke 4",
    execute(message) {
        const queue = message.client.queue.get(message.guild.id);

        if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;

        queue.songs = [];
        queue.connection.dispatcher.end();
        queue.textChannel.send("Antrian dihentikan....").catch(console.error);
    }
};