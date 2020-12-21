const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "skipto",
    description: "Skip ke urutan yang ditentukan",
    execute(message, args) {
        if (!args.length || isNaN(args[0]))
            return message
                .reply(`Cara Pakai : ${message.client.prefix}${module.exports.name} <Nomor Antrian>`)
                .catch(console.error);

        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;
        if (args[0] > queue.songs.length)
            return message.reply(`Antrian cuma berisi ${queue.songs.length} lagu`).catch(console.error);

        queue.playing = true;

        if (queue.loop) {
            for (let i = 0; i < args[0] - 2; i++) {
                queue.songs.push(queue.songs.shift());
            }
        } else {
            queue.songs = queue.songs.slice(args[0] - 2);
        }

        queue.connection.dispatcher.end();
        queue.textChannel.send(`Skip ke antrian nomor ${args[0]}....`).catch(console.error);
    }
};