module.exports = {
    name: 'unmute',
    aliases: [],
    permissions: ["MUTE_MEMBERS"],
    description: "This unmutes a member",
    execute(message, args, cmd, client, Discord, profileData) {
        const unMuted = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`<@${memberTarget.user.id}> has been unmuted`)
        const noMem = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription('Cannot Find That Mamber!')

        const target = message.mentions.users.first();
        if (target) {
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'mute');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(unMuted);
        } else {
            message.channel.send(noMem);
        }
    }
}