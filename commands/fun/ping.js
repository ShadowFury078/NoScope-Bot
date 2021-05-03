module.exports = {
    name: 'ping',
    permissions: [],
    discription: "This is a ping command!",
    execute(message){
        message.channel.send('pong!');
    }
}