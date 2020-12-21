module.exports = {
    name: "ping",
    cooldown: 2,
    description: "Melakukan ping ke server (hanya developer yang paham)",
    execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            message.channel.send(`[Discord API]<-----${Math.round(message.client.ws.ping)} ms----->[${message.author.tag}]`).catch(console.error);
        }
    }
}