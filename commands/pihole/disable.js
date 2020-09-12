module.exports = {
    name: 'disable',
    description: 'Pihole disable',
    execute(message, args) {
        //importing discord and request 
        const request = require('request');
        const Discord = require("discord.js");
        //minutes and seconds args 
        const secs = ['secs', 'sec', 'seconds', 'second']
        const mins = ['mins', 'min', 'minutes', 'minute']
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
            // api key
            var envapi = `process.env.piapi`;
            var picountrapi = `${args[0]}`;
            var combstrapi = envapi.concat(picountrapi);
            var api = eval(combstrapi);

            //time set minutes and seconds
            if (secs.some(v => args[2].includes(v))) {
                var url = `${ip}/admin/api.php?disable=${args[1]}&auth=${api}`;
                requestpi(message)
            } else if (mins.some(v => args[2].includes(v))) {
                var url = `${ip}/admin/api.php?disable=${Math.floor(args[1] * 60)}&auth=${api}`;
                requestpi(message)
            } else {
                var url = `${ip}/admin/api.php?disable&auth=${api}`;
                requestpi(message)
            };

            function requestpi(message) {
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
                        if (secs.some(v => args[2].includes(v))) {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`🥧 Disabled For ${args[1]} Seconds 🥧`)
                                .setColor(`0x00FF00`)
                                .setURL(`${ip}/admin`)
                                .setTimestamp()
                                .setFooter(`Pihole ip: ${eval(combstrip)}`);
                            message.channel.send(embed);
                        } else if (mins.some(v => args[2].includes(v))) {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`🥧 Disabled For ${args[1]} Minutes 🥧`)
                                .setColor(`0x00FF00`)
                                .setURL(`${ip}/admin`)
                                .setTimestamp()
                                .setFooter(`Pihole ip: ${eval(combstrip)}`);
                            message.channel.send(embed);
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`🥧 Disabled 🥧`)
                                .setColor(`0x00FF00`)
                                .setURL(`${ip}/admin`)
                                .setTimestamp()
                                .setFooter(`Pihole ip: ${eval(combstrip)}`);
                            message.channel.send(embed);
                        };
                    }
                })
            }
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
            // api key
            // time and seconds setup
            //time set minutes and seconds
            if (args[1]) {
                if (secs.some(v => args[1].includes(v))) {
                    var url = `${ip}/admin/api.php?disable=${args[0]}&auth=${process.env.piapi1}`;
                    requestpi(message)
                } else if (mins.some(v => args[1].includes(v))) {
                    var url = `${ip}/admin/api.php?disable=${Math.floor(args[0] * 60)}&auth=${process.env.piapi1}`;
                    requestpi(message)
                } else {
                    console.log('you shouldnt see this')
                }
            } else {
                var url = `${ip}/admin/api.php?disable&auth=${process.env.piapi1}`;
                requestpi(message)
            }

            function requestpi(message) {
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
                        if (args[0]) {
                            if (secs.some(v => args[1].includes(v))) {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`🥧 Disabled For ${args[0]} Seconds 🥧`)
                                    .setColor(`0x00FF00`)
                                    .setURL(`${ip}/admin`)
                                    .setTimestamp()
                                    .setFooter(`Pihole ip: ${process.env.pip1}`);
                                message.channel.send(embed);
                            } else if (mins.some(v => args[1].includes(v))) {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`🥧 Disabled For ${args[0]} Minutes 🥧`)
                                    .setColor(`0x00FF00`)
                                    .setURL(`${ip}/admin`)
                                    .setTimestamp()
                                    .setFooter(`Pihole ip: ${process.env.pip1}`);
                                message.channel.send(embed);
                            } else {
                                console.log('you shouldnt see this')
                            };
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`🥧 Disabled 🥧`)
                                .setColor(`0x00FF00`)
                                .setURL(`${ip}/admin`)
                                .setTimestamp()
                                .setFooter(`Pihole ip: ${process.env.pip1}`);
                            message.channel.send(embed);
                        }
                    }
                })
            }
        } else {
            console.log('well you should never see this but if you do \ngo to github and tell me https://github.com/joshua-noakes1/pibot')
        }
    },
};