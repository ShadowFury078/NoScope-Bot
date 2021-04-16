const profileModel = require('../modles/profileSchema');


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
    return message.channel.send(`${message.author.username}, you begged and received **${randomNumber} coins**`);
  },
};