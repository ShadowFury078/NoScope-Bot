module.exports = {
    name: 'help~general',
    aliases: ['hg', 'help~g'],
    permissions: [],
    discription: "Gnaral Commands",
    execute(message, args, cmd, client, Discord) {
        const help = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Gnaral Commands')   
            .addFields(
                {name: 'bot~activity', value: `\`-bot~activity\``, inline: true},
                {name: 'help', value: `\`-help\``, inline: true},
                {name: 'ping', value: `\`-ping\``, inline: true},
                {name: 'rules', value: `\`-rules\``, inline: true},
                
            )
            
            message.channel.send(help);
    }


}