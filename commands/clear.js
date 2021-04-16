module.exports = {
    name: 'clear',
    aliases: ['delete', 'purge'],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    description: "Clears messages!",
    async execute(message, args, cmd, client, Discord, profileData){

        if(!args[0]) return message.reply("Please select the amount of messages you want to clear!");
        if(isNaN(args[0])) return message.reply("Please enter real number!");

        if(args[0] > 100) return message.reply("you cannot put a number more then 100!");
        if(args[0] < 1) return message.reply("you must clear aleast 1 or more than 1");

        await message.channel.messages.fetch({Limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}