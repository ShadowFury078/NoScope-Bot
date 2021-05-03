module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    discription: "Shows the the bot commands in Embed form",
    execute(message, args, cmd, client, Discord, profileData) {

        const helpFun = new Discord.MessageEmbed()
            .setColor('#FF0000')   
            .addFields(
                {name: 'Fun Commands', value: `\`-bot activity, -guesseasy, -embed, -help, -ping, -rules, -yt, -tw, -twe, -teamrole, -say\``}
            )
            .setFooter("Use '-' prefix before any command");

        const helpMod = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Modaration commands')
            .addFields(
                {name: 'addMoney', value: `\`-addMoney\`**Note**: **give** is only for **Admin's**`, inline: true},
                {name: 'takeMoney', value: `\`-takeMoney\`**Note**: **take** is only for **Admin's**`, inline: true},
                {name: 'purge', value: `\`-purge\` **Note**: **clear** is only for **Mod's and Admin's**`, inline: true},
                {name: 'mute', value: `\`-mute\` **Note**: **clear** is only for **Mod's and Admin's**`, inline: true},
                {name: 'unmute', value: `\`-unmute\` **Note**: **clear** is only for **Mod's and Admin's**`, inline: true},
            )
            .setFooter("Use '-' prefix before any command");

        const helpEco = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
            {name: 'Economy Commands', value: `\`-bal, -beg, -dep, -search, -wd\``},
            )
            .setFooter("Use '-' prefix before any command");

        const helpUtility = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: 'Utility Commands', value: `\`-play, -stop, -suggestion, -rules, -ticket, -remind\``},
            )
            .setFooter("Use '-' prefix before any command");

        const help = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Bot Commands')   
            .addFields(
                {name: ':key: Moderation', value: `\`-help modaration\``, inline: true},
                {name: ':hammer: Utility', value: `\`-help utility\``, inline: true},
                {name: ':moneybag: Economy', value: `\`-help economy\``, inline: true},
                {name: ':circus_tent: Fun', value: `\`-help fun\``, inline: true}
            )
            .setFooter("Use '-' prefix before any command");

        if(!args[0]) return message.channel.send(help)
        if(args[0] === 'fun') return message.channel.send(helpFun)
        if(args[0] === 'modaration') return message.channel.send(helpMod)
        if(args[0] === 'economy') return message.channel.send(helpEco)
        if(args[0] === 'utility') return message.channel.send(helpUtility)
    }


}