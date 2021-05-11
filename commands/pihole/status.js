module.exports = {
    name: 'status',
    description: 'Pihole Status',
    execute(message) {
        //importing discord, fetch, get-ip and messageErrors 
        const fetch = require('node-fetch');
        const Discord = require("discord.js");
        const get_ip = require('../backend/get-ip');
        const messageErrors = require('../backend/errors');

        (async () => {
            try {
                const pihole = await get_ip.get_ip();
                // get summary data
                var pihole_summary = await fetch(`${pihole.url}/admin/api.php?summary`);
                pihole_summary = await pihole_summary.json();

                // send embed
                const embed = new Discord.MessageEmbed()
                    .setTitle('🥧 Status 🥧')
                    .setColor('0x6A5ACD')
                    .setDescription(`**Pihole Status : ** *${pihole_summary.status}*‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎**Clients :** *${pihole_summary.unique_clients}*\n**Domains Blocked :** *${pihole_summary.domains_being_blocked}* ‎‏‏‎ ‎‏‏‎ **Blocked Today :** *${pihole_summary.ads_blocked_today}*\n**Queries Today :** *${pihole_summary.dns_queries_today}* ‎‏‏‎ ‎‏‏‎ **Blocked Percentage :** *${pihole_summary.ads_percentage_today}%*`)
                    .setURL(`${pihole.url}/admin`)
                    .setTimestamp()
                    .setFooter(`Pihole: ${pihole.hostname}`);
                message.channel.send(embed);
            } catch (error) {
                messageErrors.embedError(message, error);
                return;
            }
        })();
    },
};