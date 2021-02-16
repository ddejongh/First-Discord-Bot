module.exports = {
    name: 'ping',
    description: 'basic test command',
    execute(message, args) {
        message.channel.send('Pong!'); 
    }, 
};