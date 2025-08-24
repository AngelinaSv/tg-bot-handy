require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cityHandler = require('./handlers/cityHandler');
const weatherHandler = require('./handlers/weatherHandler');
const currencyHanlder = require('./handlers/currencyHandler');
const acquaintanceHandler = require('./handlers/acquaintanceHandler');
const messages = require('./messages/ru');
const validator = require('./utils/validator');

const bot = new TelegramBot(process.env.TOKEN, {
    polling: {
    autoStart: true,
  }
});

bot.getUpdates({ offset: -1 });

bot.setMyCommands([
    { command: '/start', description: 'Выбор города' },
    { command: '/acquaintance',  description: 'Знакомство'},
    { command: '/weather', description: 'Погода' },
    { command: '/convert', description: 'Калькулятор валют' },
]);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        return cityHandler.start(bot, chatId);
    }

    if (text === '/acquaintance') {
        return acquaintanceHandler.acquaintance(bot, chatId);
    }

    if (text === '/weather') {
        return weatherHandler.getWeather(bot, chatId);
    }

    if (text === '/convert') {
        currencyHanlder.clearUserSelections(chatId);
        return currencyHanlder.chooseCurrency(bot, chatId, {});
    }

    if (validator.isNumber(text)) {
        return currencyHanlder.convert(bot, chatId, text);
    }
});

bot.on('callback_query', (query) => {
    if (query.message.text === messages.start) {
        return cityHandler.saveCity(bot, query);
    }

    if (query.message.text === messages.chooseCurrency) {
        currencyHanlder.saveCurrency(query.message.chat.id, query);
        return currencyHanlder.chooseCurrency(bot, query.message.chat.id, query);
    }
});
