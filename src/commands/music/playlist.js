const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "playlist",
    cooldown: 2,
    description: "Show the playlist",
    async execute(message) {
        const botCommandChannel = message.guild.channels.cache.find(channel => channel.name === "bot-command");

        if (message.channel != botCommandChannel) {
            message.channel.send(`Can only use bot command on ${botCommandChannel} channel!`);
        } else {
            const permissions = message.channel.permissionsFor(message.client.user);
            if (!permissions.has(["MANAGE_MESSAGE", "ADD_REACTIONS"]))
                return message.reply("You don't have `MANAGE_MESSAGE` and `ADD_REACTION` permission");

            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("There is no song in queue!");

            let currentPage = 0;
            const embeds = generateQueueEmbed(message, queue.songs);

            const queueEmbed = await message.channel.send(
                `**Current Page - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
            );

            try {
                await queueEmbed.react("⬅️");
                await queueEmbed.react("⏹");
                await queueEmbed.react("➡️");
            } catch (error) {
                console.error(error);
                message.channel.send(error.message).catch(console.error);
            }

            const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

            collector.on("collect", async(reaction, user) => {
                try {
                    if (reaction.emoji.name === "➡️") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(`**Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else if (reaction.emoji.name === "⬅️") {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`**Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll().then(() => {
                            message.channel.bulkDelete(1);
                        });
                    }
                } catch (error) {
                    console.error(error);
                    return message.channel.send(error.message).catch(console.error);
                }
            });
        }
    }
};

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");

        const embed = new MessageEmbed()
            .setTitle("In queue\n")
            .setThumbnail(message.guild.iconURL())
            .setColor("#F8AA2A")
            .setDescription(`**Now Playing - [${queue[0].title}](${queue[0].url})**\n\n${info}`);
        embeds.push(embed);
    }

    return embeds;
}