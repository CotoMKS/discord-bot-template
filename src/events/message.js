const { Client, Message } = require ("discord.js");



module.exports = async(bot, msg)=>{
    if (!msg.guild?.me?.hasPermission('SEND_MESSAGES') || msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    const prefix = bot.PREFIX
    const prefixMention = new RegExp(`^<@!?${bot.user?.id}>( |)$`);
    if (msg.content.match(prefixMention)) return msg.channel.send(`My prefix is: ${prefix}`)

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const cname = args.shift()?.toLowerCase()
    const cfun = bot.commands.get(`${cname}`) || bot.aliases.find((c)=>c.aliases && c.aliases.includes(`${cname}`))

    if (!cfun) return;
    try {await cfun.execute(msg, args)}
    catch(e){console.log(e);msg.channel.send(`e`).catch(e=>{})}
}   