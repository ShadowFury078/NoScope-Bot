module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sg'],
    permissions: [],
    description: 'creates a suggestion!',
    execute(message, args, cmd, client, discord){
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if(!channel) return message.channel.send('suggestions channel does not exist!');

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(messageArgs);
        
        channel.send(embed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
    }
}