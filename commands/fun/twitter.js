module.exports = {
    name: 'twetter',
    aliases: ['twe'],
    permissions: [],
    discription: "this is a link to my twetter",
    execute(message){
        message.channel.send('https://twitter.com/AnikethIlkal')
    }
}