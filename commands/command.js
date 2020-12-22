module.exports = {
    name: 'command',
    description: "Embeds!",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff2255')
        .setTitle('My Github')
        .setURL('https://github.com/ddejongh')
        .setDescription('This is an embed for testing embeds.')
        .addFields(
            {name: 'field1', value: 'From field one'}
        )
        .setImage('https://i.pinimg.com/originals/fe/48/fb/fe48fbeb1a3bf62bf44c10882611017a.jpg')
        .setFooter('Test (from footer)');

        message.channel.send(newEmbed);
    }  
}