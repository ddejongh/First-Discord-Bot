const config = require('./config.json');

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = config.prefix; 

// Output ready to console 
client.once('ready', () => {
    console.log('Randy has arrived.');
});

// Add command handler here 
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/);      // splice command entries 
    const command = args.shift().toLowerCase();                         // force to lower handle caps from user 

    if(command === 'ping') {
        message.channel.send(`Pong: Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
    } else if(command == '8ball') {
        message.channel.send(`Magic 8 ball says: probably not`); 
    }
}); 

client.login(config.token); 