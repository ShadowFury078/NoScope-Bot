module.exports = {
    name: 'youtube',
    aliases: ['YTchannel', 'yt'],
    permissions: [],
    discription: "this is a link to my youtube",
    execute(message){
        message.channel.send('https://www.youtube.com/channel/UChYJk47foakRUOnaYmP3qfw')
    }
}