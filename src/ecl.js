/**
 * Events and Commands Loader v1
 */

const { Client } = require('discord.js')
const { resolve } = require('path')
const { readdirSync } = require('fs')

const eventFolder = resolve(__dirname, 'events')
const commandFolder = resolve(__dirname, 'commands')

module.exports =  function EventCommandLoader(bot){
    loadEvent(bot)
    loadCommand(bot)
}

const loadEvent = (bot)=>{
    const F = readdirSync(eventFolder)
    F.forEach(fn=>{
        if (!fn.endsWith('.js')) return;
        bot.on(fn.split('.')[0], require(`./event/${fn}`).bind(null, bot))
    })
}

const loadCommand = (bot)=>{
    const cats = readdirSync(commandFolder)
    cats.forEach(c=>{
        const F = readdirSync(`${commandFolder}/${c}`)
        F.forEach(fn=>{
            const props= require(`${commandFolder}/${c}/${fn}`)
            bot.commands.set(fn.split('.')[0], props)
            if (props.aliases) props.aliases.forEach((a)=>{
                bot.aliases.set(a, bot.commands.get(fn.split('.')[0]))
            })
        })
    })
}