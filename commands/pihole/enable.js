module.exports = {
    name: 'enable',
    description: 'Pihole enable',
    execute(message) {
        const request = require('request');
        const Discord = require("discord.js");

        var url = `${process.env.piurl}/admin/api.php?enable&auth=${process.env.piapi}`;

        request.get({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, (err, res) => {
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
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🥧 Pihole Enabled 🥧`)
                    .setColor(`0x00FF00`)
                    .setURL(`${process.env.piurl}/admin`);
                message.channel.send(embed);
            }
        })

    }
};