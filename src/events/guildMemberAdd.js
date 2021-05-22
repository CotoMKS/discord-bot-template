module.exports = async(bot, member) => {
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
}