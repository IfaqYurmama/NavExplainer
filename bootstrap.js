Auth = require('./auth.json');

//set global variables
global.axios = require('axios');
global.CoinMarketCap = require('./coinmarketcap');
global.Discord = require('discord.io');
global.Logger = require('winston');
global.messages = require('./messages.json');
global.startTime = new Date().getTime();

global.uptime = () => {

    let uptime = new Date().getTime() - startTime;
    let uptimeSeconds = parseInt(uptime / 1000) + 'seconds ';
    let uptimeMinutes = parseInt(uptime / 1000 / 60) + 'minutes, ';
    let uptimeHours = parseInt(uptime / 1000 / 60 / 60) + 'hours, ';
    let uptimeDays = parseInt(uptime / 1000 / 60 / 60 / 24) + 'days, ';

    if (uptime / 1000 > 60) {

        uptimeSeconds = '';
    }
    if (uptime / 1000 / 60 > 60) {

        uptimeMinutes = '';
    }
    if (uptime / 1000 / 60 / 60 > 60) {

        uptimeHours = '';
    }
    return uptimeDays + uptimeHours + uptimeMinutes + uptimeSeconds;
};

// Initialize Discord Bot
global.bot = new Discord.Client({
    token: Auth.token,
    autorun: true
});

// Configure Logger settings
Logger.remove(Logger.transports.Console);
Logger.add(Logger.transports.Console, {
    colorize: true
});
Logger.level = 'debug';