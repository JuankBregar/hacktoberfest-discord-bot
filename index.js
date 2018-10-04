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

    switch (command) {
        case 'ping':
            handler.ping();
            break;
        case 'hello':
            handler.hello();
            break;
        case 'steak':
            handler.steak();
            break;
        case 'lul':
            handler.lul();
            break;
        case 'status':
            handler.status();
            break;
        case 'scream':
            handler.scream();
            break;
        default:
            handler.default();
            break;
    }
})

client.login(process.env.TOKEN);