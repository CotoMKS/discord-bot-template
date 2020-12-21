module.exports = {
    name: "deletemsg",
    description: "Hapus chat dalam jumlah yang ditentukan",
    async execute(message, args) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Anda tidak memiliki izin `MANAGE_MESSAGES`");

        if (!args[0]) return message.reply("Masukkan jumlah pesan yang ingin di bersihkan!");
        if (isNaN(args[0])) return message.reply("Tolong masukkan angka!");

        if (args[0] > 100) return message.reply("Tidak dapat menghapus lebih dari 100 pesan");
        if (args[0] < 2) return message.reply("Masukkan angka 2 atau lebih");

        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}