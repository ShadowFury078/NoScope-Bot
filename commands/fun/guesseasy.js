const guildNumber = new Map();
const guildAttempts = new Map();
const PROFILE_MODEL = require("../../modles/profileSchema");

function guildNumberMap(message) {
    const guildId = message.guild.id;

    var number = Math.floor(Math.random() * 100) + 1;
    if (!guildNumber.get(guildId)) {
        guildNumber.set(guildId, number);
    }
}

function guildAttemptsMap(message) {
    const guildId = message.guild.id;
    if (!guildAttempts.get(guildId)) {
        guildAttempts.set(guildId, { attempts: 1 });
    } else {
        guildAttempts.get(guildId).attempts++;
    }
}

module.exports = {
    name: "guesseasy",
    aliases: ["ge"],
    permissions: [],
    description: {
        usage: 'guesseasy <guesseasy number>',
        content: "Try and guess the number!",
    },
    async execute(message, args, cmd, client, Discord, profileData) {
        const { member, channel, guild } = message;
        const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        const provideaguess = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**❌ Please provide a guess!**`)

        const pickinganumber = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription('Picking a number between **1** and **100**')

        await PROFILE_MODEL.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: RANDOM_NUMBER,
                },
            }
        );



        await guildNumberMap(message);
        await guildAttemptsMap(message);

        let guess = args[0];
        if (!guess && guildAttempts.get(guild.id).attempts === 1) {
            return message.channel.send(pickinganumber)
        } else if (!guess) {
            return message.channel.send(provideaguess);
        }

        if (+guess === guildNumber.get(guild.id)) {
            let attempts = guildAttempts.get(guild.id);

            const guessedthenumber = new Discord.MessageEmbed()
                .setColor('#33F304')
                .setDescription(`✅ Perfect, <@${member.id}>the number was ${guildNumber.get(guild.id)}, it only took you ${attempts.attempts - 1} attempts! And you got ${RANDOM_NUMBER}`)

            message.channel.send(guessedthenumber);
            guildNumber.delete(guild.id);
            guildAttempts.delete(guild.id);


            return;
        } else if (+ guess < guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too low!`);
        } else if (+guess > guildNumber.get(guild.id)) {
            return message.reply(`${guess} Is too high!`);
        } else {
            return message.reply("Invalid number please try again");
        }
    },
};