const { canModifyQueue } = require("../../util/util");

module.exports = {
    name: "volume",
    aliases: ["v"],
    description: "Set the volume",
    execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const queue = message.client.queue.get(message.guild.id);

            if (!queue) return message.reply("There is no song in queue!").catch(console.error);
            if (!canModifyQueue(message.member))
                return message.reply("You must connected to voice channel!").catch(console.error);

            if (!args[0]) return message.reply(`Volume : **${queue.volume}%**`).catch(console.error);
            if (isNaN(args[0])) return message.reply("Use number to set the volume!").catch(console.error);
            if (Number(args[0]) > 100 || Number(args[0]) < 0)
                return message.reply("Can only set the volume from 0 to 100 %").catch(console.error);

            queue.volume = args[0];
            queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

            return queue.textChannel.send(`Volume : **${args[0]}%**`).catch(console.error);
        }
    }
}