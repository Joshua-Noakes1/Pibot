const Url = require('url-parse');

function get_ip() {
    // missing url in .env
    if (process.env.url == '' || process.env.url == undefined) {
        console.error('Missing URL in the .env file');
        return {
            "url": "missing://missing-url",
            "hostname": `${pihole_url.hostname}`
        };
    }

    // url-parse has the protocol object which returns http: so we use regex here to remove all special chars
    var pihole_url = new Url(process.env.url);
    var protocol = pihole_url.protocol.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    // missing http or https at the begining of the url
    if (!protocol.includes('http')) {
        console.error('Protocol invalid in the .env file');
        return {
            "url": "invalid://protocol",
            "hostname": `${pihole_url.hostname}`
        };
    }

    return {
        "url": `${pihole_url.origin}`,
        "hostname": `${pihole_url.hostname}`
    }
}

module.exports = {
    get_ip
}