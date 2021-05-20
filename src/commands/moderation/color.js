const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "color",
    description: "Give color role",
    execute(message, args) {
        const colorRoleChannel = message.guild.channels.cache.find(channel => channel.name === "color-role"); //Change it to your actual color role channel

        if (message.channel != colorRoleChannel) {
            message.channel.send(`Can only use bot command on ${colorRoleChannel} channel!`);
        } else {
            if (!args[0]) {

                let Red = message.guild.roles.cache.find(c => c.name === "Red"); //Make sure the Role name is exactly the same
                let Blue = message.guild.roles.cache.find(c => c.name === "Blue"); //Make sure the Role name is exactly the same
                let Green = message.guild.roles.cache.find(c => c.name === "Green"); //Make sure the Role name is exactly the same
                //You can add more as many role if you want

                let colorListEmbed = new Discord.MessageEmbed()
                    .setColor("#32aabe")
                    .setTitle("Color role List")
                    .setDescription(`Please choose your role color! \n\n- **${Red}**\n- **${Green}**\n- **${Blue}**\n\n\n_Color Role doesn't give you extra permission. It just give a color to your nickname_`);

                message.channel.send(colorListEmbed);

            } else {
                if (args[0] === "Red") {
                    let color = message.guild.roles.cache.find(c => c.name === "Red");
                    if (message.member.roles.cache.find(c => c.name === "Red")) return message.channel.send("You already have this Color Role!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`Successfully get **${color}** Color Role`);
                } else if (args[0] === "Blue") {
                    let color = message.guild.roles.cache.find(c => c.name === "Blue");
                    if (message.member.roles.cache.find(c => c.name === "Blue")) return message.channel.send("You already have this color Role!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`Successfully get **${color}** Color Role`);
                } else if (args[0] === "Green") {
                    let color = message.guild.roles.cache.find(c => c.name === "Green");
                    if (message.member.roles.cache.find(c => c.name === "Green")) return message.channel.send("You already have this color Role!");

                    let client = message.author;

                    let userTarget = message.guild.members.cache.get(client.id);
                    userTarget.roles.add(color.id), message.channel.send(`Successfully get **${color}** Color Role`);
                } else if (args[0] === "remove") {
                    if (!args[1]) return message.channel.send("What Color Role you want to remove?");

                    if (args[1] === "Red") {
                        let color = message.member.roles.cache.find(c => c.name === "Red");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("You don't have this role");
                        userTarget.roles.remove(color.id), message.channel.send(`Successfully remove **${color}** Color Role`);
                    } else if (args[1] === "Blue") {
                        let color = message.member.roles.cache.find(c => c.name === "Blue");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("You don't have this role");
                        userTarget.roles.remove(color.id), message.channel.send(`Successfully remove **${color}** Color Role`);
                        return;
                    } else if (args[1] === "Green") {
                        let color = message.member.roles.cache.find(c => c.name === "Green");
                        let client = message.author;

                        let userTarget = message.guild.members.cache.get(client.id);
                        if (!color) return message.channel.send("You don't have this role");
                        userTarget.roles.remove(color.id), message.channel.send(`Successfully remove **${color}** Color Role`);
                    }
                } else {
                    message.channel.send("Can't find that Color Role");
                }
            }
        }
    }
}