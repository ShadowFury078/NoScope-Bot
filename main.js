const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require('mongoose');
const memberCounter = require('./counters/member-counter');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commands_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connected to the DataBase');
}).catch((err) =>{
    console.log(err);
});

client.on('ready', () =>{
    client.user.setActivity('NoScope on YT | -help | Gameing Boy', { type: 'WATCHING'}).catch(console.error);
    memberCounter(client)
})

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('812717699847028746').send(`Welcome <@${guildMember.user.id}> to our server! Make sure tocheck out the rules channel!`)
});

client.login(process.env.DISCORD_TOKEN);