const Discord = require("discord.js");
const db = require("quick.db");
const ezgames = require("ez-games.js")
module.exports.run = async (client, message, args) => {
    let data = await ezgames.speed(message.author.id, message.guild.id, message.author.displayAvatarURL({ format: 'png'}), client.user.username)

 let embed = new Discord.MessageEmbed()
.setTitle(`You Have 15 Seconds To Type the word`)
.setImage(data.image)
.setFooter(message.guild.name , message.guild.iconURL())
.setTimestamp()
 message.channel.send(embed)
 let author = m => m.author.id === message.author.id;
 let pointcollecter = new Discord.MessageCollector(message.channel, author , { max: 1 , time: 15000 }); 
 pointcollecter.on('collect', async msg => {
     let word = data.word;
     if(msg.content.toLowerCase() === word.toLowerCase()) {
   message.channel.send(`Congrats, You've Got 2 Coins!`)  
   db.add(`money_${message.author.id}`, 2)

} else {
   message.channel.send(`Incorrect the right word was ${word.toLowerCase()}, you lost 1 Coin`)
   db.add(`money_${message.author.id}`, 1)
     }
  })
  }
                
                   
