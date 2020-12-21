const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "removesong",
    aliases: ["rs"],
    description: "Hapus lagu dari Antrian",
    execute(message, args) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("Tidak ada lagu yang sedang dimainkan").catch(console.error);
        if (!canModifyQueue(message.member)) return;

        if (!args.length) return message.reply(`Cara Pakai: ${message.client.prefix}hapuslagu <Nomor Antrian>`);
        if (isNaN(args[0])) return message.reply(`Cara Pakai: ${message.client.prefix}hapuslagu <Nomor Antrian>`);

        const song = queue.songs.splice(args[0] - 1, 1);
        queue.textChannel.send(`Menghapus **${song[0].title}** dari antrian.`);
    }
};