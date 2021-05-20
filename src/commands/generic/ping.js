module.exports = {
    name: "ping",
    cooldown: 2,
    description: "Ping to Discord API",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            message.channel.send(`Latency : ${Math.round(message.client.ws.ping)}ms`).catch(console.error);
        }
    }
}