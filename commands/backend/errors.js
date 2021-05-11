const Discord = require("discord.js");
const get_ip = require('./get-ip');

function embedError(message, error) {
    const pihole = get_ip.get_ip();

    const embed = new Discord.MessageEmbed()
        .setTitle(`🥧 Error 🥧`)
        .setColor(`0xFF0000`)
        .setDescription(`Something Went Wrong When Talking To Pihole!\n*${error.message}*`)
        .setURL(`${pihole.url}/admin`)
        .setTimestamp()
        .setFooter(`Pihole: ${pihole.hostname}`);
    message.channel.send(embed);
}

module.exports = {
    embedError
}