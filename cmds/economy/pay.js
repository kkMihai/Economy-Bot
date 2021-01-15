const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
try {
  let user2 = message.author
    if (!args[0]) return message.channel.send("**Please Enter A User!**");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!user) return message.channel.send("**Enter A Valid User!**");

    let member = db.fetch(`money_${user2.id}`);

    
    if (!args[0]) {
      return message.channel.send("Mention someone to pay");
    }
    
    if (user.user.id === message.author.id) {
      return message.channel.send("you cannot pay yourself");
    }

    
    if (!args[1]) {
      return message.channel.send("Specify an amount to pay");
    }
    let embed4 = new MessageEmbed()
      .setColor("#D6D6D6")
      .setDescription(`❌ Enter A Valid Amount!`);

    if (isNaN(args[1])) {
      return message.channel.send("Enter a valid amount");
    }
    let embed5 = new MessageEmbed()
      .setColor("#D6D6D6")
      .setDescription(`❌ You don't have that much money`);

    if (member < args[1]) {
      return message.channel.send("You don't have that much money, poor");
    }

    
      message.channel.send(`✅ You have payed ${user.displayName} ${args[1]} coins`);

    
    db.add(`money_${user.id}`, args[1]);
    db.subtract(`money_${user2.id}`, args[1]);
    } catch {
        
    }
  }
