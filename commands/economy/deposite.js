const profileModel = require('../../modles/profileSchema');
module.exports = {
  name: "deposit",
  aliases: ["dep"],
  permissions: [],
  description: "Deposit coins into your bank!",
  async execute(message, args, cmd, client, discord, profileData) {
    const amount = args[0];
    
    const embed = new discord.MessageEmbed()
      .setColor('#F30B04')
      .setDescription(`You deposited **${amount}** of coins into your bank`)

    const notWhole = new discord.MessageEmbed()
     .setColor('#FF0000')
     .setDescription(`Deposit amount must be a whole number`)

    const notdep = new discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`You don't have that amount of coins to deposit`)

    if (amount % 1 != 0 || amount <= 0) return message.channel.send(notWhole);
    try {
      if (amount > profileData.coins) return message.channel.send(notdep);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        }
      );
      
      return message.channel.send(embed);

    } catch (err) {
      console.log(err);
    }
    
  },
};