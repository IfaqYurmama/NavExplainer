bot.on('ready', function (evt) {

    Logger.info('Connected');
    Logger.info('Logged in as: ');
    Logger.info(bot.username + ' - (' + bot.id + ')');

    bot.setPresence(
        {
            "idle_since": null,
            "game": {
                "name": "!kbhelp about"
            }
        });
});

bot.on('message', function (user, userID, channelID, message, evt) {

    // bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {

        let args = message.substring(1).split(' ');
        let cmd = args[0];
        let argument = args[1];
        let response = '';

        if (cmd === 'price') {

            CoinMarketCap.get(channelID);

        } else {

            if ((cmd === 'kbhelp' || cmd === 'nts') && messages[cmd][argument]) {

                response = messages[cmd][argument];
                Logger.info(argument + "command invoked by user: " + user);

            } else if (cmd === 'uptime') {

                response = 'Time since startup: ' + uptime();

            } else {

                response = 'This search term was not found. You can write "!kbhelp list" to get a list of all commands.' +
                    '\nIf you believe it should be included please contact Jonathan.'
            }

            bot.sendMessage({
                to: channelID,
                message: response
            });
        }
    }
});