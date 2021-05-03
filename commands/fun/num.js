module.exports = {
    name: 'num',
    aliases: ['add', 'mult', 'divide', 'substract', 'power'],
    permissions: [],
    cooldown: 0,
    description: 'Advanced music bot',
    execute(message, args, cmd, client, Discord, profileData){
        if(cmd === 'add') add_numb(message, args);
        else if(cmd === 'divide') div_numb(message, args);
        else if(cmd === 'mult') mult_numb(message, args);
        else if(cmd === 'substract') sub_numb(message, args);
        else if(cmd === 'power') pow_numb(message, args);
    }
}


const add_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 + num2

    message.channel.send(sum)
};
const mult_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 * num2

    message.channel.send(sum)
};
const div_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 / num2

    message.channel.send(sum)
};
const sub_numb = (message, args) => {
    var num1 = parseFloat(args[0])
    var num2 = parseFloat(args[1])
    var sum = num1 - num2

    message.channel.send(sum)
};
const pow_numb = (message, args) => {
    var num1 = parseInt(args[0])
    var num2 = parseInt(args[1])
    var mulRes = 1
    var i;
    for(i=0; i<num2; i++){
        mulRes = mulRes * num1
        message.channel.send(`i=${i} mulRes=${mulRes}`)
    }

    message.channel.send(mulRes)
};