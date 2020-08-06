module.exports = {
    name: 'recent',
    description: 'Pihole Recent',
    execute(message) {
        const request = require('request');
        const Discord = require("discord.js");

        var url = `${process.env.piurl}/admin/api.php?recentBlocked`;

        request.get({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, (err, res, data) => {
            if (err) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🥧 Pihole Error 🥧`)
                    .setColor(`0xFF0000`)
                    .setDescription(`Something Went Wrong When Talking To Pihole!\n${err}`)
                    .setURL(`${process.env.piurl}/admin`);
                message.channel.send(embed);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                if (!res.body) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥧 No Recently Blocked Domain 🥧`)
                        .setColor('0x6A5ACD')
                        .setDescription(`No Recent Queries Have Been Blocked`)
                        .setURL(`${process.env.piurl}/admin`);
                    message.channel.send(embed);
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥧 Pihole Recently Blocked Domain 🥧`)
                        .setColor('0x6A5ACD')
                        .setDescription(`*Recently Blocked Domain:*  \'**${res.body}**\'`)
                        .setURL(`${process.env.piurl}/admin`);
                    message.channel.send(embed);
                }
            }
        })
    }
};