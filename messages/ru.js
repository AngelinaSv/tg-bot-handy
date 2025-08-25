const { prepareDate } = require('../utils/formatters');

module.exports = {
  acquaintance: 'Привет, я Handy 🐣\nЯ всегда в курсе погоды в твоём городе и готов помочь тебе с конвертацией валют!',
  start: 'Давай выберем город для отслеживания погоды 🌍',
  citySaved: (city) => `Город сохранён: ${city} ✅`,
  weather: (data) => `${data.current.temp_c}°C,  ${data.current.condition.text}\n${data.location.name}, ${data.location.country}\nLast updated:  ${prepareDate(data.current.last_updated)}`,
  chooseCurrency: 'Выбери две валюты',
  chooseAmount: (currency) => `Введи сумму ${currency}`,
  conversionResult: (data, currency) => `${data.result[currency]} ${currency}\n\nКурс: ${data.result.rate}`,
  error: "Что-то пошло не так 🌧️",
};
