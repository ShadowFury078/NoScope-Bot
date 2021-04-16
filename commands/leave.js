module.exports = {
    name: 'leave',
    aliases: ['stop'],
    permissions: ["CONNECT", "SPEAK"],
    description: "leave the channel and stops the song",
    async execute(message) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the song!");
        await voiceChannel.leave();
        await message.channel.send("Leaving the channel :smiling_face_with_tear:")
    }
}