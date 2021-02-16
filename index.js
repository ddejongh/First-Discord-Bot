const Discord = require('discord.js')       // require discord.js
const client = new Discord.Client()         // create client instance 
const ytdl = require('ytdl-core')
const fs = require('fs');                   // add Node's basic filesystem 

const config = require('./config.json')             // require the config -> contains token and prefix 
const prefix = config.prefix                        // define prefix 

// prepare the command handler 
client.commands = new Discord.Collection();         
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the collection 
    // with the key as the command name and the value of the exported module 
    client.commands.set(command.name, command); 
}

client.once('ready', () => {
    console.log('Ready!'); 
}); 
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});

// comman handler here 
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase(); 
    
    if(command === 'ping') {
        client.commands.get('ping').execute(message, args); 
    } else if (command === 'args-info') {
        client.commands.get('args-info').execute(message, args);    
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message);     
    } else if (command === 'avatar') {
        client.commands.get('avatar').execute(message);
    } else if (command === 'prune') {
		client.commands.get('prune').execute(message, args); 
    }
});

// provide Discord API login token 
client.login(config.token)