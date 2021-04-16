const profileModel = require('../modles/profileSchema');
module.exports = {
  name: "take",
  aliases: [],
  permissions: ["ADMINISTRATOR"],
  description: "takes a player's coins",
  async execute(message, args, cmd, client, discord, profileData) {

    if (!args.length) return message.channel.send("You need to mention a player to take the coins from them");

    const amount = args[1];
    const target = message.mentions.users.first();

    if (!target) return message.channel.send("That user does not exist");
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("The amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(`This user doens't exist is the db`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );

      return message.channel.send(`This player coins has bean taken! **${amount}** of coins!`);
    } catch (err) {
      console.log(err);
    }
  },
};