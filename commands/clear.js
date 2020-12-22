module.exports = {
    name: 'clear', 
    descriptions: "Clear messages!",
    async execute(message, args) {
        if(!args[0]) return message.reply("Please enter the amount of messages that you wanted to clear.");
        if(isNaN(args[0])) return message.reply("Please enter a real number!"); 

        if(args[0] > 100) return message.reply("You cannot delete more than 100 messages at a time.");
        if(args[0] < 1) return message.reply("You must delete at least one message.");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages); 
        });
    }
}