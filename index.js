const Discord = require('discord.js');
const bot = new Discord.Client();
const settings = require('./settings.json');
const fs = require('fs');
const db = require('quick.db');

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag}`);
  })

bot.on("message", async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
    const prefix = settings.prefix;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");
  let cmd = args.shift().toLowerCase();
  message.prefix = prefix;
  if (!message.content.startsWith(prefix)) return;
     
  
  // Command Handler
  try {
    let commandFile = require(`./cmds/economy/${cmd}.js`);
    commandFile.run(bot, message, args, prefix);
  } catch (err) {}
    })



//Login.
bot.login(settings.token)
