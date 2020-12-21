const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Menammpilkan seluruh perintah yang tersedia",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("Perintah yang tersedia : ")
      .setColor("#32aabe");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });
    
    helpEmbed.setFooter('Hikawa Sayo | Made by : CotoMKS27#9361');

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
