module.exports = {
  acquaintance: 'Привет, я Handy 🐣\nЯ всегда в курсе погоды в твоём городе и готов помочь тебе с конвертацией валют!',
  start: 'Давай выберем город для отслеживания погоды 🌍',
  citySaved: (city) => `Город сохранён: ${city} ✅`,
  chooseCurrency: 'Выбери две валюты',
  chooseAmount: (currency) => `Введи сумму ${currency}`,
  conversionResult: (data, currency) => `${data.result[currency]} ${currency}\n\nКурс: ${data.result.rate}`,
  error: "Что-то пошло не так 🌧️",
};
