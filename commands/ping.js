module.exports = {
    name: "ping",
    cooldown: 2,
    description: "Melakukan ping ke server (hanya developer yang paham)",
    execute(message) {
        message.channel.send(`[Discord API]<-----${Math.round(message.client.ws.ping)} ms----->[${message.author.tag}]`).catch(console.error);
    }
};