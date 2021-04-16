module.exports = {
    name: 'help~social',
    aliases: ['hs', 'help~s'],
    permissions: [],
    discription: "Social Sites commands",
    execute(message, args, cmd, client, Discord) {
        const help = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: 'youtube', value: `\`-yt\``, inline: true},
                {name: 'twitch', value: `\`-tw\``, inline: true},
                {name: 'twetter', value: `\`-twe\``, inline: true}
            )
            
            message.channel.send(help);
    }


}