module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff2255')
        .setTitle('Testing Embeds')
        .setURL('https://youtube.com/PewDiePie')
        .setDescription('This is an embed for testing embeds.')
        .addFields(
            {name: 'PewDiePie #1', value: 'Brofist'}
        )
        .setFooter('Test (from footer)');

        message.channel.send();
    }  
}