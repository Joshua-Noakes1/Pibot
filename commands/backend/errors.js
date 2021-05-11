const Discord = require("discord.js");
const get_ip = require('./get-ip');

function embedError(message, error) {
    const embed = new Discord.MessageEmbed()
        .setTitle(`🥧 Error 🥧`)
        .setColor(`0xFF0000`)
        .setDescription(`Something Went Wrong When Talking To Pihole!\n*${error.message}*`)
        .setURL(`${get_ip.get_ip().url}/admin`)
        .setTimestamp()
        .setFooter(`Pihole: ${get_ip.get_ip().hostname}`);
    message.channel.send(embed);
}

module.exports = {embedError}