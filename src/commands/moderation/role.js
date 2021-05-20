const { PREFIX } = require("../../util/util");
const prefix = PREFIX;

module.exports = {
    name: "role",
    description: "Memberi atau Menghapus role",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("You don't have `MANAGE_ROLES` permission!");

            if (args[0] === "add") {
                let user = message.mentions.users.first();
                if (!user) return message.channel.send(`How to use : ${prefix}role add <member name> <role name>`);

                let role = message.guild.roles.cache.find(r => r.name === args.slice(2).join(" "));
                if (!role) return message.channel.send(`How to use : ${prefix}role add <member name> <role name>`);

                let userTarget = message.guild.members.cache.get(user.id);
                userTarget.roles.add(role.id), message.channel.send(`Successfully give ${role} Role to ${user}`);
            } else if (args[0] === "remove") {
                let user = message.mentions.users.first();
                if (!user) return message.channel.send(`How to use : ${prefix}role remove <member name> <role name>`);

                let role = message.guild.roles.cache.find(r => r.name === args.slice(2).join(" "));
                if (!role) return message.channel.send(`How to use : ${prefix}role remove <member name> <role name>`);

                let userTarget = message.guild.members.cache.get(user.id);
                userTarget.roles.remove(role.id), message.channel.send(`Successfully remove ${role} Role from ${user}`);
            } else {
                message.channel.send(`How to use : ${prefix}role add/remove <member name> <role name>`)
            }
        }
    }
}