const axios = require('axios');

class CurrencyService {
    constructor() {
        this.api = axios.create({ 
            baseURL: "https://api.primeapi.io/",
            timeout: 5000
        });
    }

    async convert(from, to, amount) {
        const { data } = await this.api.get(`/convert?`, {
            params: {
                api_key: process.env.CURRENCY_API_KEY,
                from,
                to,
                amount
            }
        });
        
        return data;
    }
}

module.exports = new CurrencyService();
