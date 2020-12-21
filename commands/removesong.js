const { canModifyQueue } = require("../util/util");

module.exports = {
    name: "removesong",
    aliases: ["rs"],
    description: "Remove song from the playlist",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("There is no song in queue!").catch(console.error);
            if (!canModifyQueue(message.member)) return;

            if (!args.length) return message.reply(`How to  use : ${message.client.prefix}removesong <queue number>`);
            if (isNaN(args[0])) return message.reply(`How to  use : ${message.client.prefix}removesong <queue number>`);

            const song = queue.songs.splice(args[0] - 1, 1);
            queue.textChannel.send(`Remove **${song[0].title}** from queue`);
        }
    }
}