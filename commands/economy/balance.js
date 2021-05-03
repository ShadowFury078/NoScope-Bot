const profileModel = require('../../modles/profileSchema');

module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
    execute(message, args, cmd, client, Discord, profileData) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'s Balance`)
            .setColor('#FF0000')
            .setDescription(`Wallet: ₿**${profileData.coins}** \n Bank: **₿${profileData.bank}**`)
            .setTimestamp()

        message.channel.send(embed);

    },
};