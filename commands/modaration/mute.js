const ms = require('ms');

module.exports = {
    name: 'mute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    description: "This mutes a member",
    execute(message, args) {
        const target = message.mentions.users.first();
        if (target) {

            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(muted);
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(timeMuted);

            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send(memNo);
        }
        const muted = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`<@${memberTarget.user.id}> has been muted`)
        const timeMuted = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`)
        const memNo = new Disocrd.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`Cant Find That Member!`)

    }
}