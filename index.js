const { Client, Attachment } = require('discord.js');
const https = require('https');
const client = new Client();
const prefix = 'hack!';
const { Handler } = require('./handler');

client.on('ready', () => console.log('Bot has logged in!'));

client.on('message', async(msg) => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;
    let args = msg.content.split(' ');
    const command = args.shift().slice(prefix.length).toLowerCase();
    const handler = new Handler(msg, client, args);
    //Add your commands here. Good command handlers are overrated :POGGERS:
    if (command === 'ping') {
        handler.ping();
    } else if (command === 'hello') {
        handler.hello();
    } else if (command === 'steak') {
        handler.steak();
    } else if (command === 'lul') {
        handler.lul();
    } else if (command === 'status') {
        handler.status();
    } else if (command === 'scream') {
        handler.scream();
    }
})

client.login(process.env.TOKEN);