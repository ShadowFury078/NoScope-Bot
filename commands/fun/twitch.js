module.exports = {
    name: 'twich',
    aliases: ['tw'],
    permissions: [],
    discription: "this is a link to my twich",
    execute(message){
        message.channel.send('https://www.twitch.tv/anikethilkal')
    }
}