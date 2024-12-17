const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect
    .create({
        session: 'sessionName',
        catchQR: (base64Qr, asciiQR) => {
            console.log(asciiQR); // Optional to log the QR in the terminal
            var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};

            if (matches.length !== 3) {
                return new Error('Invalid input string');
            }
            response.type = matches[1];
            response.data = new Buffer.from(matches[2], 'base64');

            var imageBuffer = response;
            require('fs').writeFile(
                'out.png',
                imageBuffer['data'],
                'binary',
                function (err) {
                    if (err != null) {
                        console.log(err);
                    }
                }
            );
        },
        logQR: false,
    })
    .then((client) => start(client))
    .catch((error) => console.log(error));

function escolherEmoji() {
    const flags = [
        "🏁", // Chequered flag
        "🚩", // Triangular flag
        "🎌", // Crossed flags
        "🏴", // Black flag
        "🏳️", // White flag
        "🏳️‍🌈", // Rainbow flag (LGBTQ+)
        "🏴‍☠️", // Pirate flag
        "🇦🇨", // Ascension Island
        "🇦🇩", // Andorra
        "🇦🇪", // United Arab Emirates
        "🇦🇫", // Afghanistan
        "🇦🇬", // Antigua & Barbuda
        "🇦🇮", // Anguilla
        "🇦🇱", // Albania
        "🇦🇲", // Armenia
        "🇦🇴", // Angola
        "🇦🇶", // Antarctica
        "🇦🇷", // Argentina
        "🇦🇸", // American Samoa
        "🇦🇹", // Austria
        "🇦🇺", // Australia
        "🇦🇼", // Aruba
        "🇦🇽", // Åland Islands
        "🇦🇿", // Azerbaijan
        "🇧🇦", // Bosnia & Herzegovina
        "🇧🇧", // Barbados
        "🇧🇩", // Bangladesh
        "🇧🇪", // Belgium
        "🇧🇫", // Burkina Faso
        "🇧🇬", // Bulgaria
        "🇧🇭", // Bahrain
        "🇧🇮", // Burundi
        "🇧🇯", // Benin
        "🇧🇱", // St. Barthélemy
        "🇧🇲", // Bermuda
        "🇧🇳", // Brunei
        "🇧🇴", // Bolivia
        "🇧🇶", // Caribbean Netherlands
        "🇧🇷", // Brazil
        "🇧🇸", // Bahamas
        "🇧🇹", // Bhutan
        "🇧🇻", // Bouvet Island
        "🇧🇼", // Botswana
        "🇧🇾", // Belarus
        "🇧🇿", // Belize
        "🇨🇦", // Canada
        "🇨🇨", // Cocos (Keeling) Islands
        "🇨🇩", // Congo - Kinshasa
        "🇨🇫", // Central African Republic
        "🇨🇬", // Congo - Brazzaville
        "🇨🇭", // Switzerland
        "🇨🇮", // Côte d’Ivoire
        "🇨🇰", // Cook Islands
        "🇨🇱", // Chile
        "🇨🇲", // Cameroon
        "🇨🇳", // China
        "🇨🇴", // Colombia
        "🇨🇷", // Costa Rica
        "🇨🇺", // Cuba
        "🇨🇻", // Cape Verde
        "🇨🇼", // Curaçao
        "🇨🇽", // Christmas Island
        "🇨🇾", // Cyprus
        "🇨🇿", // Czechia
        "🇩🇪", // Germany
        "🇩🇯", // Djibouti
        "🇩🇰", // Denmark
        "🇩🇲", // Dominica
        "🇩🇴", // Dominican Republic
        "🇩🇿", // Algeria
        "🇪🇦", // Ceuta & Melilla
        "🇪🇨", // Ecuador
        "🇪🇪", // Estonia
        "🇪🇬", // Egypt
        "🇪🇭", // Western Sahara
        "🇪🇷", // Eritrea
        "🇪🇸", // Spain
        "🇪🇹", // Ethiopia
        "🇪🇺", // European Union
        "🇫🇮", // Finland
        "🇫🇯", // Fiji
        "🇫🇰", // Falkland Islands
        "🇫🇲", // Micronesia
        "🇫🇴", // Faroe Islands
        "🇫🇷", // France
        "🇬🇦", // Gabon
        "🇬🇧", // United Kingdom
        "🇬🇩", // Grenada
        "🇬🇪", // Georgia
        "🇬🇫", // French Guiana
        "🇬🇬", // Guernsey
        "🇬🇭", // Ghana
        "🇬🇮", // Gibraltar
        "🇬🇱", // Greenland
        "🇬🇲", // Gambia
        "🇬🇳", // Guinea
        "🇬🇵", // Guadeloupe
        "🇬🇶", // Equatorial Guinea
        "🇬🇷", // Greece
        "🇬🇸", // South Georgia & South Sandwich Islands
        "🇬🇹", // Guatemala
        "🇬🇺", // Guam
        "🇬🇼", // Guinea-Bissau
        "🇬🇾", // Guyana
        "🇭🇰", // Hong Kong SAR
        "🇭🇲", // Heard & McDonald Islands
        "🇭🇳", // Honduras
        "🇭🇷", // Croatia
        "🇭🇹", // Haiti
        "🇭🇺", // Hungary
        "🇮🇨", // Canary Islands
        "🇮🇩", // Indonesia
        "🇮🇪", // Ireland
        "🇮🇱", // Israel
        "🇮🇲", // Isle of Man
        "🇮🇳", // India
        "🇮🇴", // British Indian Ocean Territory
        "🇮🇶", // Iraq
        "🇮🇷", // Iran
        "🇮🇸", // Iceland
        "🇮🇹", // Italy
        "🇯🇪", // Jersey
        "🇯🇲", // Jamaica
        "🇯🇴", // Jordan
        "🇯🇵", // Japan
        "🇰🇪", // Kenya
        "🇰🇬", // Kyrgyzstan
        "🇰🇭", // Cambodia
        "🇰🇮", // Kiribati
        "🇰🇲", // Comoros
        "🇰🇳", // St. Kitts & Nevis
        "🇰🇵", // North Korea
        "🇰🇷", // South Korea
        "🇰🇼", // Kuwait
        "🇰🇾", // Cayman Islands
        "🇰🇿", // Kazakhstan
        "🇱🇦", // Laos
        "🇱🇧", // Lebanon
        "🇱🇨", // St. Lucia
        "🇱🇮", // Liechtenstein
        "🇱🇰", // Sri Lanka
        "🇱🇷", // Liberia
        "🇱🇸", // Lesotho
        "🇱🇹", // Lithuania
        "🇱🇺", // Luxembourg
        "🇱🇻", // Latvia
        "🇱🇾", // Libya
        "🇲🇦", // Morocco
        "🇲🇨", // Monaco
        "🇲🇩", // Moldova
        "🇲🇪", // Montenegro
        "🇲🇬", // Madagascar
        "🇲🇭", // Marshall Islands
        "🇲🇰", // North Macedonia
        "🇲🇱", // Mali
        "🇲🇲", // Myanmar
        "🇲🇳", // Mongolia
        "🇲🇴", // Macau SAR
        "🇲🇷", // Mauritania
        "🇲🇺", // Mauritius
        "🇲🇻", // Maldives
        "🇲🇼", // Malawi
        "🇲🇽", // Mexico
        "🇲🇾", // Malaysia
        "🇲🇿", // Mozambique
        "🇳🇦", // Namibia
        "🇳🇵", // Nepal
        "🇳🇴", // Norway
        "🇧🇷", // Brazil
    ];
    const randomIndex = Math.floor(Math.random() * flags.length);
    return flags[randomIndex];
}

function start(client) {
    client.onMessage((message) => {
        client.sendText(message.from, "Você quis dizer? " + message.body)
            .then((result) => {
                console.log('Result: ', result); // return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); // return object error
            });

    })
    // client.onMessage((message) => {
    //     if (message.body === 'Toição') {
    //         const emoji = escolherEmoji();
    //         client
    //             .sendText(message.from, emoji)
    //             .then((result) => {
    //                 console.log('Result: ', result); // return object success
    //             })
    //             .catch((erro) => {
    //                 console.error('Error when sending: ', erro); // return object error
    //             });
    //     }
    //});
}
