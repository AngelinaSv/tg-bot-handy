const axios = require('axios');
const UserService = require('./user.service');

class WeatherService {
    constructor() {
        this.api = axios.create({ 
            baseURL: "http://api.weatherapi.com/v1",
            timeout: 5000
        });
    }

    async getWeather(chatId) {
        const city = await UserService.getUserCity(chatId);

        const { data } = await this.api.get('/current.json', {
            params: {
                key: process.env.WEATHER_API_KEY,
                q: city,
                lang: 'ru'
            }
        });

        return data;
    }
}

module.exports = new WeatherService();
