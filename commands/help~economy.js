module.exports = {
    name: 'help~economy',
    aliases: ['he', 'help~e'],
    permissions: [],
    discription: "economy commands",
    execute(message, args, cmd, client, Discord) {
        const help = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: 'balance', value: `\`-bal\``, inline: true},
                {name: 'beg', value: `\`-beg\``, inline: true},
                {name: 'deposite', value: `\`-dep\``, inline: true},
                {name: 'search', value: `\`-search\``, inline: true},
                {name: 'withdraw', value: `\`-wd\``, inline: true}
            )
            
            message.channel.send(help);
    }


}