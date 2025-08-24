const WeatherService = require('../services/weather.service');
const messages = require('../messages/ru');
const { prepareDate } = require('../utils/formatters');

async function getWeather(bot, chatId) {
  try {
    const data = await WeatherService.getWeather(chatId);

    const iconUrl = "https:" + data.current.condition.icon;
    const message = `${data.current.temp_c}°C,  ${data.current.condition.text}\n${data.location.name}, ${data.location.country}\nLast updated:  ${prepareDate(data.current.last_updated)}`;

    return bot.sendPhoto(chatId, iconUrl, {
        caption: message
    });
  } catch (error) {
    console.log(error);
    return bot.sendMessage(chatId, messages.error);
  }
};

module.exports = { getWeather };
