module.exports = {
    name: 'status',
    description: 'Pihole Status',
    execute(message, args) {
        //importing discord and request 
        const request = require('request');
        const Discord = require("discord.js");
        //Checking for a second pi instance
        if (process.env.picount != 1) {
            //counter checker https://www.codecademy.com/forum_questions/51c858349c4e9dd24201011d
            for (var counter = 0; counter <= process.env.picount; counter++) {
                if (message.content.includes(counter)) {
                    //https secure 
                    if (process.env.schema == 'Secure') {
                        //pihole port 
                        //eval string https://stackoverflow.com/questions/14014371/how-do-i-convert-a-string-into-an-executable-line-of-code-in-javascript
                        var envport = `process.env.port`;
                        var picountrport = `${args[0]}`;
                        var combstrport = envport.concat(picountrport);
                        var port = eval(combstrport);
                        if (port == 80) {
                            //iphole pi
                            var envip = `process.env.pip`;
                            var picountrip = `${args[0]}`;
                            var combstrip = envip.concat(picountrip);
                            var ip = `https://${eval(combstrip)}`
                            console.log(ip)
                        } else {
                            //iphole port
                            var envport = `process.env.port`;
                            var picountrport = `${args[0]}`;
                            var combstrport = envport.concat(picountrport);
                            var port = eval(combstrport);
                            //pihole ip
                            var envip = `process.env.pip`;
                            var picountrip = `${args[0]}`;
                            var combstrip = envip.concat(picountrip);
                            var ip = `https://${eval(combstrip)}:${eval(port)}`
                            console.log(ip)
                        }
                        //http insecure
                    } else {
                        //pihole port 
                        var envport = `process.env.port`;
                        var picountrport = `${args[0]}`;
                        var combstrport = envport.concat(picountrport);
                        var port = eval(combstrport);
                        if (port == 80) {
                            //iphole pi
                            var envip = `process.env.pip`;
                            var picountrip = `${args[0]}`;
                            var combstrip = envip.concat(picountrip);
                            var ip = `http://${eval(combstrip)}`
                        } else {
                            //iphole port
                            var envport = `process.env.port`;
                            var picountrport = `${args[0]}`;
                            var combstrport = envport.concat(picountrport);
                            var port = eval(combstrport);
                            //pihole ip
                            var envip = `process.env.pip`;
                            var picountrip = `${args[0]}`;
                            var combstrip = envip.concat(picountrip);
                            var ip = `http://${eval(combstrip)}:${eval(port)}`
                        }
                    }

                } 
            }
            var url = `${ip}/admin/api.php?summary`
            request.get({
                url: url,
                json: true,
                headers: {
                    'User-Agent': 'request'
                }
            }, (err, res, data) => {
                if (err) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥧 Error 🥧`)
                        .setColor(`0xFF0000`)
                        .setDescription(`Something Went Wrong When Talking To Pihole!\n${err}`)
                        .setURL(`${ip}/admin`)
                        .setTimestamp()
                        .setFooter(`Pihole ip: ${eval(combstrip)}`);
                    message.channel.send(embed);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥧 Status 🥧`)
                        .setColor('0x6A5ACD')
                        .setDescription(`**Pihole Status : ** *${data.status}*‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎**Clients :** *${data.unique_clients}*\n**Domains Blocked :** *${data.domains_being_blocked}* ‎‏‏‎ ‎‏‏‎ **Blocked Today :** *${data.ads_blocked_today}*\n**Queries Today :** *${data.dns_queries_today}* ‎‏‏‎ ‎‏‏‎ **Blocked Percentage :** *${data.ads_percentage_today}%*`)
                        .setURL(`${ip}/admin`)
                        .setTimestamp()
                        .setFooter(`Pihole ip: ${eval(combstrip)}`);
                    message.channel.send(embed);
                }
            })
            //Only one pihole
        } else if (process.env.picount == 1) {

            if (process.env.schema == 'Secure') {
                if (process.env.port1 == 80) {
                    var ip = `https://${process.env.pip1}`;
                } else {
                    var ip = `https://${process.env.pip1}:${process.env.port1}`
                }
            } else {
                if (process.env.port1 == 80) {
                    var ip = `http://${process.env.pip1}`;
                } else {
                    var ip = `http://${process.env.pip1}:${process.env.port1}`
                }
            }
            var url = `${ip}/admin/api.php?summary`
            request.get({
                url: url,
                json: true,
                headers: {
                    'User-Agent': 'request'
                }
            }, (err, res, data) => {
                if (err) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🥧 Error 🥧`)
                        .setColor(`0xFF0000`)
                        .setDescription(`Something Went Wrong When Talking To Pihole!\n${err}`)
                        .setURL(`${ip}/admin`)
                        .setTimestamp()
                        .setFooter(`Pihole ip: ${process.env.pip1}`);
                    message.channel.send(embed);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('🥧 Status 🥧')
                        .setColor('0x6A5ACD')
                        .setDescription(`**Pihole Status : ** *${data.status}*‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎**Clients :** *${data.unique_clients}*\n**Domains Blocked :** *${data.domains_being_blocked}* ‎‏‏‎ ‎‏‏‎ **Blocked Today :** *${data.ads_blocked_today}*\n**Queries Today :** *${data.dns_queries_today}* ‎‏‏‎ ‎‏‏‎ **Blocked Percentage :** *${data.ads_percentage_today}%*`)
                        .setURL(`${ip}/admin`)
                        .setTimestamp()
                        .setFooter(`Pihole ip: ${process.env.pip1}`);
                    message.channel.send(embed);
                }
            })
        } else {
            console.log('well you should never see this but if you do \ngo to github and tell me https://github.com/joshua-noakes1/pibot')
        }
    },
};