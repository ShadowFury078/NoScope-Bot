module.exports = {
    name: 'help~main',
    aliases: ['hm', 'help~m'],
    permissions: [],
    discription: "main commands",
    execute(message, args, cmd, client, Discord) {
        const help = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                
                {name: 'play', value: `\`-play\``, inline: true},
                {name: 'stop', value: `\`-stop\``, inline: true},
                {name: 'suggestions', value: `\`-sg\``, inline: true},
                {name: 'rules', value: `\`-rules\``, inline: true},
                {name: 'TeamRole', value: `\`-tr\``, inline: true},
                {name: 'Ticket', value: `\`-ticket\``, inline: true},
                {name: 'clear', value: `\`-clear\``, inline: true}
            )
            
            message.channel.send(help);
    }
}