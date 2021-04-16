module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    permissions: [],
    description: "Check the user balance",
    execute(message, args, cmd, client, Discord, profileData) {
        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: 'Wallet' , value: `₿**${profileData.coins}**`},
                {name: 'Bank', value: `₿**${profileData.bank}**`}
            )

            message.channel.send(embed);
        
    },
};