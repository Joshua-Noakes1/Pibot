//Pibot is an unoffical discord bot for using pihole in discord.
//Open source @ https://github.com/Joshua-Noakes1/Pibot

require('dotenv').config();
//discord magic
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const clientcommands = require('./commands');
///
//Yeah this code is bad
const prefix_use = process.env.prefix;
//but lets say i cant code
const prefix = prefix_use.toLowerCase();
///
Object.keys(clientcommands).map(key => {
    client.commands.set(clientcommands[key].name, clientcommands[key]);
});
//connecting to discord 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

//messages what else
client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    if (!client.users.cache.get(process.env.ID)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        console.log(command);
        client.commands.get(command).execute(message, args, client, Discord);
    } catch (err) {
        console.log(err)
        const main_message_error = new Discord.MessageEmbed()
            .setTitle(`An error has occured with "${command}"`)
            .setColor('0xFF0000')
            .setThumbnail('https://raw.githubusercontent.com/Joshua-Noakes1/Lake-CDN/master/CDN/Images/Errors/error_1_red.png')
            .setDescription(`Hey, ${message.member.displayName} something's gone wrong!\nCan you report what went wrong on [github](https://github.com/joshua-noakes1/Pibot)?`)
            .setTimestamp();
        message.channel.send(main_message_error);
        return;
    };
});

client.login(process.env.Bot_Token).catch(err => {
    console.log(err);
});