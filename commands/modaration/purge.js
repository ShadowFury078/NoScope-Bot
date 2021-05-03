module.exports = {
    name: 'purge',
    aliases: ['delete', 'p'],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    description: "Clears messages!",
    async execute(message, args, cmd, client, Discord, profileData) {

        const number = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription("Please select the amount of messages you want to clear!")
        const realNo = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription("Please enter real number!")
        const hund = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription("you cannot put a number more then 100!")
        const one = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setDescription("you must clear aleast 1 or more than 1")
        const del = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription("Deleted the messages!")

        if (!args[0]) return message.reply(number);
        if (isNaN(args[0])) return message.reply(realNo);

        if (args[0] > 100) return message.reply(hund);
        if (args[0] < 1) return message.reply(one);

        await message.channel.messages.fetch({ Limit: args[0] }).then(messages => {
            message.channel.bulkDelete(messages);
        });
        return message.channel.send(del)

    }
}