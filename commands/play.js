const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    aliases: ['song', 'start'],
    permissions: ["CONNECT", "SPEAK"],
    description: "plays a music!",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("You must be in a voice channel in order to hear a song!");
        if (!args.length) return message.channel.send("You need to send the second argument!");

        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1)? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){
            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });

            await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
        } else {
            message.channel.send("No Video Result Found!")
            .then(voiceChannel.leave());
        }
    }
}