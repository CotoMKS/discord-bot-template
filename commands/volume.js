const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "volume",
    aliases: ["v"],
    description: "Mengatur volume dari lagu yang sedang dimainkan",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            const queue = message.client.queue.get(message.guild.id);

            if (!queue) return message.reply("Tidak ada lagu yang sedang dimainkan").catch(console.error);
            if (!canModifyQueue(message.member))
                return message.reply("Harus berada di Voice Channel").catch(console.error);

            if (!args[0]) return message.reply(`🔊 Volume saat ini : **${queue.volume}%**`).catch(console.error);
            if (isNaN(args[0])) return message.reply("Gunakan angka untuk mengatur volume").catch(console.error);
            if (Number(args[0]) > 100 || Number(args[0]) < 0)
                return message.reply("Hanya bisa menggunakan angka 0 sampai 100").catch(console.error);

            queue.volume = args[0];
            queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

            return queue.textChannel.send(`🔊 Volume Saat ini : **${args[0]}%**`).catch(console.error);
        }
    }
}