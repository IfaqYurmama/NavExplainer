var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var time_startup = new Date().getTime();
const CoinMarketCap = require('coinmarketcap-api');
client = new CoinMarketCap();

let btc;
let usd;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function keepTime(){
	var time_running = new Date().getTime() - time_startup;
	var uptime_sec = parseInt(time_running/1000) + 'secs ';
	if(time_running/1000 > 60){uptime_sec=''}
	var uptime_min = parseInt(time_running/1000/60) + 'mins ';
  if(time_running/1000/60 > 60){uptime_min=''}
	var uptime_hr = parseInt(time_running/1000/60/60) + 'hrs ';
  if(time_running/1000/60/60 > 60){uptime_hr=''}
	var uptime_day = parseInt(time_running/1000/60/60/24) + 'days ';
	return uptime_day + uptime_hr + uptime_hr + uptime_min + uptime_sec;
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence(
      {
        "idle_since": null,
        "game":
          {"name": "!kbhelp about"}
      });
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var argument = args[1];
        args = args.splice(1);
        if(cmd === 'kbhelp'){
            switch(argument) {
            // !COMMANDNAMEHERE
              case 'about':
		            logger.info('about command invoked by ' + user);
                bot.sendMessage({
                    to: channelID,
                    message: 'If you have a problem with a topic you can type "!kbhelp <search term>". To get a list of all commands write "!kbhelp list". \n\nThe bot is still work in progress. If something is missing or not working contact Jonathan.'
                });
              break;
              default:
		            logger.info('invalid command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'This search term was not found. You can write "!kbhelp list" to get a list of all commands. \nIf you believe it should be included please contact Jonathan.'
                });
              break;
              case 'list':
		            logger.info('list command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'This is a list of all currently supported commands.\n\nDefault commands: "about", "list"\nGeneral commands: "data", "bootstrap", "connection", "firewall", "backup", \n                                      "encrypt", "repair", "update", "restore", "electrum"\nSpecific commands: "navpi", "navpay", "paper", "navcoin"'
                });
              break;
              case 'navpi':
		            logger.info('NavPi command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-set-up-the-navpi/'
                });
              break;
              case 'data':
		            logger.info('data folder command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-find-the-navcoin-data-folder/'
                });
              break;
              case 'connection':
		            logger.info('connection count command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-increase-your-connection-count/'
                });
              break;
              case 'bootstrap':
		            logger.info('bootstrap command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-bootstrap-your-core-wallet/'
                });
              break;
              case 'backup':
		            logger.info('backup command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-encrypt-and-back-up-your-navcoin-core-wallet/'
                });
              break;
              case 'encrypt':
		            logger.info('encrypt command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-encrypt-and-back-up-your-navcoin-core-wallet/'
                });
              break;
              case 'repair':
		            logger.info('repair command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/fixing-a-wallet-balance-with-missing-coins-incorrect-balance/'
                });
              break;
              case 'update':
		            logger.info('update command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'NavCoin Core: https://info.navcoin.org/knowledge-base/how-to-update-your-navcoin-core-wallet/ NavPi: https://info.navcoin.org/knowledge-base/how-to-update-the-navpi/'
                });
              break;
              case 'restore':
		            logger.info('restore command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'NavCoin Core: https://info.navcoin.org/knowledge-base/how-to-restore-your-navcoin-core-wallet-from-a-backup/ NavPi: https://info.navcoin.org/knowledge-base/restoring-your-wallet-to-a-navpi/'
                });
              break;
              case 'electrum':
		            logger.info('electrum command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-do-i-get-coins-out-of-the-electrum-wallet/'
                });
              break;
              case 'data':
		            logger.info('data command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-find-the-navcoin-data-folder/'
                });
              break;
              case 'firewall':
		            logger.info('firewall command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/knowledge-base/how-to-open-the-firewall-ports-for-navcoin-core-and-navpi/'
                });
              break;
              case 'navpay':
		            logger.info('navpay command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/article-categories/navpay/'
                });
              break;
              case 'navcoin':
		            logger.info('repair command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/article-categories/navcoin/'
                });
              break;
              case 'paper':
		            logger.info('repair command invoked');
                bot.sendMessage({
                    to: channelID,
                    message: 'https://info.navcoin.org/article-categories/paper-wallet/'
                });
              break;
          }
        }
        else if(cmd === 'uptime') {
            bot.sendMessage({
                to: channelID,
                message: 'Time since startup: ' + keepTime()
            });
    	  }
        else if (cmd === 'nts') {
          switch(argument) {
          // !COMMANDNAMEHERE
            case 'update':
              logger.info('update command invoked by ' + user);
              bot.sendMessage({
                  to: channelID,
                  message: 'https://navtechservers.com/navcore-4-1-x/'
              });
            break;
            case 'navtech':
              logger.info('update command invoked by ' + user);
              bot.sendMessage({
                  to: channelID,
                  message: 'https://navtechservers.com/navtech-tutorial/'
              });
            break;
            case 'video':
              logger.info('update command invoked by ' + user);
              bot.sendMessage({
                  to: channelID,
                  message: 'https://navtechservers.com/video-tutorials/'
              });
            break;
            case 'navpi':
              logger.info('update command invoked by ' + user);
              bot.sendMessage({
                  to: channelID,
                  message: 'https://navtechservers.com/tutorials/navpi-4-1-x/'
              });
            break;
            case 'repair':
              logger.info('repair command invoked by ' + user);
              bot.sendMessage({
                  to: channelID,
                  message: 'https://navtechservers.com/tutorials/written-tutorials/#NavPi'
              });
            break;
          }
        }
        else{}
     }
});
