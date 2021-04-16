module.exports = {
    name: 'rules',
    permissions: [],
    discription: "Shows the Rules of the server in Embed form",
    execute(message, args, cmd, client, Discord, profileData) {
        const rules = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Rules')   
            .setURL('https://discord.com/channels/789083101921673277/812588069542166548')
            .setDescription("Please Read All The Rules And Follow Them")
            .addFields(
                {name: 'Rule1', value: 'Please use the correct channels and follow the Rules & guidelines set out in the channel'},
                {name: 'Rule2', value: 'No spam or self-promotion (server invites, advertisements, etc) without permission from a staff member. This includes DMing fellow members.'},
                {name: 'Rule3', value: 'Please ensure all posts, usernames, statuses, and profile picturess are appropriate.'},
                {name: 'Rule4', value: 'Avoid any type of political/religion discussions'},
                {name: 'Rule5', value: 'English only. This helps ensure that the moderators can understand what you are saying'}
            )
            .setImage('https://cdn.discordapp.com/avatars/816208368141205514/95c23242684f450669aa982bf3983d7e.png?size=256')
            .setFooter('Please follow all the Rules');
            
            message.channel.send(rules);    
    }


}