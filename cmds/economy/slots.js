const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

module.exports.run = async (client, message, args) => {
    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;


    if (!money) return message.channel.send("Specify an amount");
    if (money > moneydb) return message.channel.send("You don't have that amount of money, poor guy xD");

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 3
        win = true;
    }
    if (win) {

          message.channel.send(`**${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\nYou won ${money} coins**`)
        db.add(`money_${user.id}`, money)
    } else {
            message.channel.send(`**${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins**`)
        
        db.subtract(`money_${user.id}`, money)
    }
    }
