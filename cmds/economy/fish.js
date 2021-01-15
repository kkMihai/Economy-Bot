const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const fishes = {
	"junk": {
		"symbol": "🔧"
	},
	"common": {
		"symbol": "🐟"
	},
	"uncommon": {
		"symbol": "🐠"
	},
	"rare": {
		"symbol": "🦑"
	}, 
  "legendary": {
    "symbol": "🐋"
  } 

}

module.exports.run = async (bot, message, args) => {
        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)

        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
               
          message.channel.send(`**🎣 You Cast Out Your Line And Caught A ${fishh.symbol}, And sell it for ${worth} Coins**!`)     

            db.add(`money_${user.id}`, worth);
                    }
        
}