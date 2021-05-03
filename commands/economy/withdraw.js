const profileModel = require('../../modles/profileSchema');
module.exports = {
  name: "withdraw",
  aliases: ["wd", "withd"],
  permissions: [],
  description: "withdraw coins from your bank",
  async execute(message, args, cmd, client, discord, profileData) {
    const amount = args[0];

    const embed = new discord.MessageEmbed()
      .setColor('#F30B04')
      .setDescription(`You withdrew **${amount}** of coins into your wallet`)
    
    const notWhole = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`Withdrawn amount must be a whole number`)

    const noMoney = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`You don't have that amount of coins to withdraw`)

    if (amount % 1 != 0 || amount <= 0) return message.channel.send(notWhole);

    try {
      if (amount > profileData.bank) return message.channel.send(noMoney);

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return message.channel.send(embed);
    } catch (err) {
      console.log(err);
    }
  },
};