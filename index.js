const config = require('./config.json');            // read token and prefix from config 
const Discord = require('discord.js');              // requrie discord.js 
const fs = require('fs');                           // file system module 
const client = new Discord.Client();                // create instance of client 
const prefix = config.prefix;                       // read in prefix from config 
const ytdl = require("ytdl-core")                   // include ytdl util for music bot 

// Other variables 
const queue = new Map(); 

client.commands = new Discord.Collection();         // extends map 

// make sure they are js files 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

// read in commands from 'commands' directory 
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
    } else if(command === 'command') {
        client.commands.get('command').execute(message, args, Discord);
    } else if(command === 'clear') {
        client.commands.get('clear').execute(message, args); 
    } else if(command === 'play') {
        client.commands.get('play').execute(message, serverQueue, queue);
    }
}); 

client.login(config.token); 