const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (client, message, args) => {
let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
    
        message.channel.send(` You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
      
      } else {

        let replies = ['Programmer','Builder','Busboy','Chief','Mechanic', 'Dark Dev', 'P*rn Star', 'Pizza Guy']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
       
        message.channel.send(`:white_check_mark: You worked as a ${replies[result]} and earned ${amount} coins`);
        
        
        db.add(`money_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    }
    }
