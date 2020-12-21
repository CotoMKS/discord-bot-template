const { MessageEmbed } = require("discord.js");
const YouTubeAPI = require("simple-youtube-api");
const { YOUTUBE_API_KEY } = require("../util/util");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
    name: "searchsong",
    aliases: ["ss"],
    description: "Mencari lagu di Youtube dan memutarnya di Voice Channel yang kamu tempati saat ini",
    async execute(message, args) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "🤖bot-command🤖");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Bot Command hanya bisa digunakan di ${botCommandChannel}`);
        } else {
            if (!args.length)
                return message
                    .reply(`Cara pakai : ${message.client.prefix}${module.exports.name} <Nama video atau lagu yang ingin anda putar>`)
                    .catch(console.error);
            if (message.channel.activeCollector)
                return message.reply("Aku cuman butuh jawabanmu....");
            if (!message.member.voice.channel)
                return message.reply("Harus berada di dalam Voice Channel").catch(console.error);

            const search = args.join(" ");

            let resultsEmbed = new MessageEmbed()
                .setTitle(`**Balas dengan angka 1 sampai 5**`)
                .setDescription(`Hasil Dari: ${search}`)
                .setColor("#32aabe");

            try {
                const results = await youtube.searchVideos(search, 5);
                results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

                let resultsMessage = await message.channel.send(resultsEmbed);

                function filter(msg) {
                    const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/g;
                    return pattern.test(msg.content);
                }

                message.channel.activeCollector = true;
                const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
                const reply = response.first().content;

                if (reply.includes(",")) {
                    let songs = reply.split(",").map((str) => str.trim());

                    for (let song of songs) {
                        await message.client.commands
                            .get("play")
                            .execute(message, [resultsEmbed.fields[parseInt(song) - 1].name]);
                    }
                } else {
                    const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;
                    message.client.commands.get("play").execute(message, [choice]);
                }

                message.channel.activeCollector = false;
                resultsMessage.delete().catch(console.error);
                response.first().delete().catch(console.error);
            } catch (error) {
                console.error(error);
                message.channel.activeCollector = false;
                message.reply(error.message).catch(console.error);
            }
        }
    }
}