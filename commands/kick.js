module.exports = {
    name: "kick", 
    description: "Kick user mentioned in message",
    execute(message) {
        if (!message.mentions.users.size) {
            return message.reply("You need to taga user to kick them."); 
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}.`);
    },
};