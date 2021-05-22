import { Client, Message } from "discord.js";

const prefix = process.env.PREFIX || 'c'

module.exports = async(bot:Client, msg:Message)=>{
    if (!msg.guild?.me?.hasPermission('SEND_MESSAGES') || msg.author.bot) return;
    if (msg.channel.type === 'dm') return;

    const prefixMention = new RegExp(`^<@!?${bot.user?.id}>( |)$`);
    if (msg.content.match(prefixMention)) return msg.channel.send(`My prefix is: ${prefix}`)

    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/)
    const cname = args.shift()?.toLowerCase()
    const cfun = bot.commands.get(`${cname}`) || bot.aliases.find((c:any)=>c.aliases && c.aliases.includes(`${cname}`))

    if (!cfun) return;
    try {await cfun.exec(bot, msg, args)}
    catch(e){console.log(e);msg.channel.send(`e`).catch(e=>{})}
}   