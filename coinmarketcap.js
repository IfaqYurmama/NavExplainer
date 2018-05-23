function get(channelID) {

    new Promise((resolve, reject) => {
        axios.get('https://api.coinmarketcap.com/v2/ticker/377/?convert=BTC')
            .then(response => {
                resolve(response).then(data => (
                    data.results
                ));
            })
            .catch(response => {
                reject(response);
            })
    })
        .then(response => {
            show(response.data.data.quotes, channelID);

        })
        .catch(response => {
            console.log('error: ' + response);
        });
}

function show(data, channelID) {

    let message = '```USD price: $' + data.USD.price +
        '\nBTC price: ' + data.BTC.price + ' BTC' +
        '\n24h change: ' + data.BTC.percent_change_24h + '%' +
        '\n7 day change: ' + data.BTC.percent_change_7d + '%```';

    bot.sendMessage({
        to: channelID,
        message: message
    });
}

module.exports = {

    get,
};