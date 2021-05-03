const profileModel = require('../../modles/profileSchema');
module.exports = {
  name: "takeMoney",
  aliases: [],
  permissions: ["ADMINISTRATOR"],
  description: "takes a player's coins",
  async execute(message, args, cmd, client, discord, profileData) {

    const amount = args[1];
    const target = message.mentions.users.first();

    const embed = new discord.MessageEmbed()
      .setColor('#F30B04')
      .setDescription(`This player coins has bean taken! **${amount}** of coins!`)
    const mention = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`You need to mention a player to give them coins!`)

    const noDB = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`This user doens't exist in the db`)
    
    const noMember = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`This user doens't exist`)

    const notWhole = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`Deposit amount must be a whole number`)

    const noMoney = new discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`The member does not have this much **${amount}** in his wallet`)

    if (!args.length) return message.channel.send(mention);
    if (!target) return message.channel.send(noMember);
    if (amount % 1 != 0 || amount <= 0) return message.channel.send(notWhole);

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.channel.send(noDB);
      if (targetData.coins < amount) return message.channel.send(noMoney);

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

      return message.channel.send(embed);
    } catch (err) {
      console.log(err);
    }
  },
};