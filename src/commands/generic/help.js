const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Show all available commands",
  execute(message) {
    const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

    if (message.channel != botCommandChannel) {
      message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
    } else {
      let commands = message.client.commands.array();

      let helpEmbed = new MessageEmbed()
        .setTitle("Available Commands : ")
        .setColor("#32aabe");

      commands.forEach((cmd) => {
        helpEmbed.addField(
          `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
          `${cmd.description}`,
          true
        );
      });
      return message.channel.send(helpEmbed).catch(console.error);
    }
  }
}