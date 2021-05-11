// Pibot is an unoffical discord bot for using pihole in discord.
// Open source @ https://github.com/Joshua-Noakes1/Pibot

// config
require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const clientcommands = require('./commands');
const prefix = process.env.prefix || '-';

Object.keys(clientcommands).map(key => {
    client.commands.set(clientcommands[key].name, clientcommands[key]);
});

// connecting to discord 
client.on('ready', () => {
    client.user.setActivity('the pi bake', {
        type: "WATCHING"
    });
    console.log(`Logged in as ${client.user.tag}`);
});

//reading messages
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    if (!client.users.cache.get(process.env.ID)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error)
        const error_embed = new Discord.MessageEmbed()
            .setTitle(`Something has gone wrong with '${prefix}${command}'`)
            .setColor('0xFF0000')
            .setDescription(`Please check the logs and report any issues [here](https://github.com/Joshua-Noakes1/Pibot/issues)!`)
            .setTimestamp();
        message.channel.send(error_embed);
        return;
    };
});

client.login(process.env.Bot_Token).catch(error => {
    console.error(error);
});