const profileModel = require('../../modles/profileSchema');

module.exports = {
  name: "beg",
  aliases: [],
  permissions: [],
  cooldown: 120,
  description: "beg for coins",
  async execute(message, args, cmd, client, discord, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    const embed = new discord.MessageEmbed()
    .setColor('#F30B04')
    .setDescription(`${message.author.username}, you begged and received **${randomNumber} coins**`)

    return message.channel.send(embed);
  },
};