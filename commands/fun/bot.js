module.exports = {
    name: 'bot',
    aliases: ['ba'],
    permissions: [],
    discription: "Bot's Activity",
    execute(message, args, cmd, client, Discord, profileData){
    if(args[0] === 'activity') return message.channel.send('NoScope Gaming on YT, Type = Watching')
    }
}