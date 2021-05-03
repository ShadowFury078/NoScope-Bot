const PROFILE_MODEL = require("../../modles/profileSchema");

module.exports = {
  name: "search",
  aliases: ['s'],
  permissions: ["SEND_MESSAGES"],
  cooldown: 120,
  description: {
    usage: "-search",
    content: "Choose your search location and have a chance at some bits!",
    examples: ["-search"],
  },
  execute(message, args, cmd, client, Discord, profileData) {
    const LOCATIONS = [
      "car",
      "sock",
      "milk",
      "wallet",
      "box",
      "pocket",
      "bus",
      "gutters",
      "park",
      "train",
      "lounge",
      "keyboard",
      "picnic",
      "bathroom",
      "bed",
      "sofa",
      "backpack",
      "laptop",
      "oculus",
      "shirt",
    ];

    let chosenLocations = LOCATIONS.sort(() => Math.random() - Math.random()).slice(0, 3);

    const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    const FILTER = (m) => {
      return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
    };

    const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });

    COLLECTOR.on("collect", async (m) => {
      const EMBED = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle(`${message.author.username} searched a ${m.content} 🕵️`)
        .setDescription(`You found ₿${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
        .setFooter(`A true detective you are.`);

      await PROFILE_MODEL.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: RANDOM_NUMBER,
          },
        }
      );

      message.channel.send(EMBED);
    });
    const end = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`What are you doing <@${message.author.id}>?! There was ₿${RANDOM_NUMBER.toString().replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      )} hidden inside the ${chosenLocations[0]} 😭`)

    COLLECTOR.on("end", (collected) => {
      if (collected.size == 0) {
        return message.channel.send(end);
      }
    });
    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`<@${
        message.author.id
      }>\n**Which location would you like to search?** 🔍\nType the location in this channel.\n\`${chosenLocations.join("` `")}\``)

    message.channel.send(embed);
  },
};