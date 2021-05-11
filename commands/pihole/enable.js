module.exports = {
    name: 'enable',
    description: 'Pihole enable',
    execute(message) {
        //importing discord, fetch, get-ip and messageErrors 
        const fetch = require('node-fetch');
        const Discord = require("discord.js");
        const get_ip = require('../backend/get-ip');
        const messageErrors = require('../backend/errors');

        (async () => {
            try {
                const pihole = await get_ip.get_ip();
                // turn pihole on
                await fetch(`${pihole.url}/admin/api.php?enable&auth=${process.env.API}`);

                // send embed
                const embed = new Discord.MessageEmbed()
                    .setTitle(`🥧 Pihole Enabled 🥧`)
                    .setColor(`0x00FF00`)
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