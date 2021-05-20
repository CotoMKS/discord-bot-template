
const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const config = require('../config.json')

const client = new Client({ disableMentions: "everyone" });
require('dotenv').config({path: join(__dirname,'..','.env')})

console.log(`${process.env.BOT_TOKEN}`);
client.login(`${process.env.BOT_TOKEN}`);
client.commands = new Collection();
client.aliases = new Collection();
const PREFIX = config.PREFIX
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

require('./ecl')(client)

client.on("ready", () => {
    console.log(`${client.user.tag} is Online!`);
    client.user.setActivity("Visual Studio Code", { type: 'PLAYING' });
});

client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "YOUR-WELCOME-CHANNEL"); //Change it to your actual welcome channel
    let memberRole = member.guild.roles.cache.find(role => role.name === "Member"); //Default role
    var embedWelcome = new Discord.MessageEmbed()
        .setColor("#32aabe")
        .setTitle(`**${ member.user.tag }** has join the server!`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setDescription(`Welcome to **${ member.guild.name }**`)
        .setTimestamp();

    channel.send(embedWelcome);
    member.roles.add(memberRole).catch(console.error);
});

client.on("warn", (info) => console.log(info));
client.on("error", console.error);

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("message", async(message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `Please wait ${timeLeft.toFixed(1)} second(s) to use \`${command.name}\` again.`
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`Error while executing the command\Reason : ${error}`).catch(console.error);
    }
});