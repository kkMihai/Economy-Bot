const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;



    if (user) {
      
        message.channel.send(`**${user.user.username}'s Balance**\n\nCoins: ${bal}`
        );
      
    } else {
      return message.channel.send("**Enter A Valid User!**");
    }
  }
