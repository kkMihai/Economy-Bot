const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let user = message.author;

        let timeout = 120000;
        let amount = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

                message.channel.send(`❌ You've already begged recently`);
          
        } else {
                message.channel.send(`✅ You've begged and received ${amount} coins`);
            
            db.add(`money_${user.id}`, amount)
            db.add(`begs_${user.id}`, 1)
            db.set(`beg_${user.id}`, Date.now())


        }
  }
