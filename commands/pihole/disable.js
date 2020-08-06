module.exports = {
    name: 'disable',
    description: 'Pihole disable',
    execute(message, args) {
        const request = require('request');
        const Discord = require("discord.js");
        if (args[1] === 'sec') {
            var url = `${process.env.piurl}/admin/api.php?disable=${args[0]}&auth=${process.env.piapi}`;
            requestpi(message)
        } else if (args[1] === 'min') {
            var url = `${process.env.piurl}/admin/api.php?disable=${Math.floor(args[0] * 60)}&auth=${process.env.piapi}`;
            requestpi(message)
        } else {
            var url = `${process.env.piurl}/admin/api.php?disable&auth=${process.env.piapi}`;
            requestpi(message)
        };

        function requestpi(message) {
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
                    if (args[1] === 'sec') {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`🥧 Pihole Disabled For ${args[0]} Seconds 🥧`)
                            .setColor(`0x00FF00`)
                            .setURL(`${process.env.piurl}/admin`);
                        message.channel.send(embed);
                    } else if (args[1] === 'mins') {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`🥧 Pihole Disabled For ${args[0]} Minutes 🥧`)
                            .setColor(`0x00FF00`)
                            .setURL(`${process.env.piurl}/admin`);
                        message.channel.send(embed);
                    } else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(`🥧 Pihole Disabled 🥧`)
                            .setColor(`0x00FF00`)
                            .setURL(`${process.env.piurl}/admin`);
                        message.channel.send(embed);
                    };
                };
            });
        };
    }
};