module.exports = async(bot) => {
    const guild = bot.guilds.cache.get('756495559199686719');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('787622234650050560');

        channel.setName(`Member Count : ${memberCount.toLocaleString()}`);
    }, 900000);
}