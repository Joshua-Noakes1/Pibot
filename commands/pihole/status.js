module.exports = {
    name: 'status',
    description: 'Pihole Status',
    execute(message) {
        const request = require('request');
        const Discord = require("discord.js");

        var url = `${process.env.piurl}/admin/api.php?summary`;

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
                const embed = new Discord.MessageEmbed()
                    .setTitle('🥧 Pihole Status 🥧')
                    .setColor('0x6A5ACD')
                    .setDescription(`**Pihole Status : ** *${data.status}*‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎**Clients :** *${data.unique_clients}*\n**Domains Blocked :** *${data.domains_being_blocked}* ‎‏‏‎ ‎‏‏‎ **Blocked Today :** *${data.ads_blocked_today}*\n**Queries Today :** *${data.dns_queries_today}* ‎‏‏‎ ‎‏‏‎ **Blocked Percentage :** *${data.ads_percentage_today}%*`)
                    .setURL(`${process.env.piurl}/admin`);
                message.channel.send(embed);
            }
        })

    }
};