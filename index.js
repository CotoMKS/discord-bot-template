const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/util");
const memberCounter = require("./counters/total-member");

const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("ready", () => {
    console.log(`Hai, Sayang :)\n${client.user.tag} telah Aktif!`);
    const activities_list = [
        "with CotoMKS27#9361",
        "with Hina-chan",
        "Guitar",
        "BanG Dream! Girls Band Party",
        "with Roselia members",
        "with This Server's members",
        "Visual Studio Code",
        "Neo Fantasy Online",
        "ROBLOX",
        "Sound Volblox 3 on ROBLOX"
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(`${activities_list[index]}`, { type: 'PLAYING' });
    }, 5000);
    memberCounter(client);
});

client.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "🚀landing-page🚀");
    let orangRole = member.guild.roles.cache.find(role => role.name === "Orang");
    var embedWelcome = new Discord.MessageEmbed()
        .setColor("#32aabe")
        .setTitle(`**${ member.user.tag }** Telah bergabung!`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setDescription(`いらっしゃい\n**${ member.guild.name }** にようこそ`)
        .setFooter('Hikawa Sayo | Made by : CotoMKS27#9361')
        .setTimestamp();

    channel.send(embedWelcome);
    member.roles.add(orangRole).catch(console.error);
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

    const [, matchedPrefix] = message.content.match(prefixRegex);

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
                `Mohon tunggu ${timeLeft.toFixed(1)} detik sebelum menggunakan perintah \`${command.name}\` lagi.`
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`Terjadi Kesalahan Saat Menjalankan Perintah\nAlasan : ${error}`).catch(console.error);
    }
});