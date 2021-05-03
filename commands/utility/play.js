const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const message = require('../../events/guild/message');
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['next', 'stop', 'pause', 'resume', 'add', 'mult', 'divide'],
    permissions: ["CONNECT", "SPEAK"],
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message, args, cmd, client, Discord, profileData){

        const voice_channel = message.member.voice.channel;

        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));

                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }
        else if(cmd === 'next') next_song(message, server_queue);
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'pause') pause_song(message, server_queue);
        else if(cmd === 'resume') resume_song(message, server_queue);
        else if(cmd === 'add') add_numb(message, args);
        else if(cmd === 'mult') mult_numb(message, args);
        else if(cmd === 'divide') div_numb(message, args);
    }
    
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const next_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue, song) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if (!song) return message.channel.send("You dont have a song playing now");
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}

const pause_song = (message, server_queue) => {
    if(server_queue.connection.dispatcher.paused) return message.channel.send("Song is already paused!");

    server_queue.connection.dispatcher.pause();
    message.channel.send("Paused the song!");
}
  
const resume_song = (message, server_queue) => {
    if(!server_queue.connection.dispatcher.paused) return message.channel.send("Song isn't paused!");

    server_queue.connection.dispatcher.resume();
    message.channel.send("Resumes the song!");
}

const add_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 + num2

    message.channel.send(sum)
}
const mult_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 * num2

    message.channel.send(sum)
}
const div_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 / num2

    message.channel.send(sum)
}

