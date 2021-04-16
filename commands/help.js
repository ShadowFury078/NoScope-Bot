module.exports = {
    name: 'help',
    aliases: ['hl'],
    permissions: [],
    discription: "Shows the the bot commands in Embed form",
    execute(message, args, cmd, client, Discord) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Bot Commands')   
            .setDescription("Command Groups")
            .addFields(
                {name: 'General Commands', value: `\`-help~general\``, inline: true},
                {name: 'Main Commands', value: `\`-help~main\``, inline: true},
                {name: 'Economy Commands', value: `\`-help~economy\``, inline: true},
                {name: 'Social Sites Commands', value: `\`-help~social\``, inline: true}
            );
            
            message.channel.send(newEmbed);
    }


}