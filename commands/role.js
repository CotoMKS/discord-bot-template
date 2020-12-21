const { PREFIX } = require('../util/util');
const prefix = PREFIX;

module.exports = {
    name: "role",
    description: "Memberi atau Menghapus role",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Anda tidak memiliki izin `MANAGE_ROLES`");

            if (args[0] === "add") {
                let user = message.mentions.users.first();
                if (!user) return message.channel.send("Siapa yang ingin anda beri Role??");

                let role = message.guild.roles.cache.find(r => r.name === args.slice(2).join(" "));
                if (!role) return message.channel.send(`Role apa yang ingin anda beri ${user}?`);

                let userTarget = message.guild.members.cache.get(user.id);
                userTarget.roles.add(role.id), message.channel.send(`Berhasil Memberi Role ${role} kepada ${user}.`);
            } else if (args[0] === "remove") {
                let user = message.mentions.users.first();
                if (!user) return message.channel.send("Siapa yang ingin anda beri Role??");

                let role = message.guild.roles.cache.find(r => r.name === args.slice(2).join(" "));
                if (!role) return message.channel.send(`Role apa yang ingin anda beri ${user}?`);

                let userTarget = message.guild.members.cache.get(user.id);
                userTarget.roles.remove(role.id), message.channel.send(`Berhasil Menghapus Role ${role} dari ${user}.`);
            } else {
                message.channel.send(`Cara Pakai : ${prefix}role (add/remove) (Nama User) (Nama Role)`)
            }
        }
    }
}