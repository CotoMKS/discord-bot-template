
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
client.PREFIX = PREFIX;
client.queue = new Map();
client.cooldowns = new Collection()

require('./ecl')(client)
