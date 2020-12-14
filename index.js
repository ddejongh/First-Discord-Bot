const config = require('./config.json');

const Discord = require('discord.js');

const fs = require('fs');

const client = new Discord.Client();

const prefix = config.prefix; 

client.commands = new Discord.Collection(); 

// make sure they are js files 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command); 
}

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
        client.commands.get('ping').execute(message, args); 
    } 
}); 

client.login(config.token); 