module.exports = {
    name: 'disable',
    description: 'Pihole disable',
    execute(message, args) {
        //importing discord, fetch, get-ip and messageErrors 
        const fetch = require('node-fetch');
        const Discord = require("discord.js");
        const get_ip = require('../backend/get-ip');
        const messageErrors = require('../backend/errors');
        const seconds_array = ['secs', 'sec', 'seconds', 'second'];
        const minutes_array = ['mins', 'min', 'minutes', 'minute'];

        (async () => {
            try {
                const pihole = await get_ip.get_ip();

                // disable for x seconds / minutes
                if (args[1]) {
                    if (seconds_array.some(array => args[1].includes(array))) {
                        sendEmbed(pihole, 'sec', args[0]);
                        return;
                    }
                    if (minutes_array.some(array => args[1].includes(array))) {
                        sendEmbed(pihole, 'min', args[0]);
                        return;
                    }
                }
                // just disable
                sendEmbed(pihole);

            } catch (error) {
                messageErrors.embedError(message, error);
                return;
            }
        })();

        // send embed
        async function sendEmbed(pihole, time, time_value) {
            // switch for setting the right title
            switch (time) {
                case ('sec'):
                    // disable for x seconds
                    await fetch(`${pihole.url}/admin/api.php?disable=${time_value}&auth=${process.env.API}`)
                    var title = `🥧 Pihole Disabled for ${time_value} seconds 🥧`;
                    break;
                case ('min'):
                    // disable for x minutes * 60 to get seconds
                    await fetch(`${pihole.url}/admin/api.php?disable=${Math.floor(time_value * 60)}&auth=${process.env.API}`)
                    var title = `🥧 Pihole Disabled for ${time_value} minutes 🥧`;
                    break;
                default:
                    await fetch(`${pihole.url}/admin/api.php?disable&auth=${process.env.API}`)
                    var title = '🥧 Pihole Disabled 🥧';
                    break;
            }
            // send embed
            const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setColor(`0x00FF00`)
                .setURL(`${pihole.url}/admin`)
                .setTimestamp()
                .setFooter(`Pihole: ${pihole.hostname}`);
            message.channel.send(embed);
        }
    },
};