const { Attachment } = require('discord.js');
const https = require('https');

function Handler(msg, client, args) {
    this.msg = msg;
    this.client = client;
    this.args = args;
}

Handler.prototype.ping = async function() {
    const m = await this.msg.channel.send('Pinging...');
    m.edit(`Ponggers! Client ping: \`${m.createdTimestamp - this.msg.createdTimestamp}\`ms. Heartbeat ping: \`${this.client.ping}\`ms`);
}

Handler.prototype.hello = async function() {
    await this.msg.reply(`Hello ${this.msg.author.username}`);
}

Handler.prototype.steak = function() {
    let attach = new Attachment("https://media.giphy.com/media/9UyZI216ic5vG/giphy.gif");
    this.msg.channel.send(attach);
}

Handler.prototype.lul = function() {
    const attachment = new Attachment('https://ubisafe.org/images/lul-transparent-twitch-1.png');
    this.msg.channel.send(attachment);
}

Handler.prototype.status = async function() {
    const m = await this.msg.channel.send('Querying GitHub for pull request count during Hacktoberfest...');
    const username = this.args[0];
    const apiUrl = `https://api.github.com/search/issues?q=-label:invalid+created:2018-09-30T10%3A00%3A00%2B00%3A00..2018-11-01T12%3A00%3A00%2B00%3A00+type:pr+is:public+author:${username}&per_page=300`;
    https.get(apiUrl, {
        headers: {
            'User-Agent': 'Hacktoberfest bot <https://github.com/RuyiLi/hacktoberfest-discord-bot>',
        },
    }, resp => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const result = JSON.parse(data);

            if (result.errors) {
                m.edit(`${username} not found :(`);
            } else {
                m.edit(`${username} made ${result.total_count}/5 pull requests during Hacktoberfest 2018`);
            }
        });
    });
}

Handler.prototype.scream = function() {
    this.msg.reply(this.args[0].toUpperCase());
}

Handler.prototype.default = function() {
    this.msg.reply('We haven\'t hack that yet...');
}

module.exports = {
    Handler: Handler
}