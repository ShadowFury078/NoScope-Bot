module.exports = {
    name: 'teamrole',
    aliases: ['tr', 'trole'],
    permissions: [],
    description: "Sets up a reaction role message!",
    async execute(message, args, cmd, client, Discord, profileData) {
        const channel = '832210984813723668';

        const redTeam = message.guild.roles.cache.find(role => role.name === "redTeam");
        const blueTeam = message.guild.roles.cache.find(role => role.name === "blueTeam");
        const yellowTeam = message.guild.roles.cache.find(role => role.name === "yellowTeam");
        const greenTeam = message.guild.roles.cache.find(role => role.name === "greenTeam");
 
        const redEmoji = '🔴';
        const blueEmoji = '🔵';
        const yellowEmoji = '🟡';
        const greenEmoji = '🟢';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Choose a team to play on!')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
                + `${redEmoji} for yellow team\n`
                + `${blueEmoji} for yellow team\n`
                + `${yellowEmoji} for yellow team\n`
                + `${greenEmoji} for blue team`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(redEmoji);
        messageEmbed.react(blueEmoji);
        messageEmbed.react(yellowEmoji);
        messageEmbed.react(greenEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(redTeam);
                }
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeam);
                }
                if (reaction.emoji.name === yellowEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeam);
                }
                if (reaction.emoji.name === greenEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(greenTeam);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === redEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(redTeam);
                }
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeam);
                }
                if (reaction.emoji.name === yellowEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeam);
                }
                if (reaction.emoji.name === greenEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(greenTeam);
                }
            } else {
                return;
            }
        });
    }
 
}
