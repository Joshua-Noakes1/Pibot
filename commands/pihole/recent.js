module.exports = {
    name: 'recent',
    description: 'Pihole recent',
    execute(message) {
        //importing discord, fetch, get-ip and messageErrors 
        const fetch = require('node-fetch');
        const Discord = require("discord.js");
        const get_ip = require('../backend/get-ip');
        const messageErrors = require('../backend/errors');

        (async () => {
            try {
                const pihole = await get_ip.get_ip();
                // get recent data
                var pihole_recently_blocked = await fetch(`${pihole.url}/admin/api.php?recentBlocked&auth=${process.env.API}`);
                pihole_recently_blocked = await pihole_recently_blocked.text();

                // send embed
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🥧 Recently Blocked Domain 🥧`)
                    .setColor('0x6A5ACD')
                    .setDescription(`*Recently Blocked Domain:*  \'*${pihole_recently_blocked}*\'`)
                    .setURL(`${pihole.url}/admin/queries.php?domain=${pihole_recently_blocked}`)
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