const WeatherService = require('../services/weather.service');
const cityHandler = require('./cityHandler');
const messages = require('../messages/ru');

async function getWeather(bot, chatId) {
  try {
    const data = await WeatherService.getWeather(chatId);

    if(!data) {
      return cityHandler.start(bot, chatId);
    }

    const iconUrl = "https:" + data.current.condition.icon;

    bot.sendPhoto(chatId, iconUrl, {
        caption: messages.weather(data)
    });
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, messages.error);
  }
};

module.exports = { getWeather };
