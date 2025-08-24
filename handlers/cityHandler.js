const UserService = require('../services/user.service');
const messages = require('../messages/ru');

const cities = {
    ODESA: { text: 'Одесса', callback_data: 'Odesa' },
    LVIV: { text: 'Львов', callback_data: 'Lviv' },
    KYIV: { text: 'Киев', callback_data: 'Kyiv' },
    WARSZAWA: { text: 'Варшава', callback_data: 'Warszawa' },
    BREST: { text: 'Брест', callback_data: 'Brest' }, 
    MINSK: { text: 'Минск', callback_data: 'Minsk' },
    ASTANA: { text: 'Астана', callback_data: 'Astana' },
    KISHINEV: { text: 'Кишинёв', callback_data: 'Kishinev' },
    MOSCOW: { text: 'Москва', callback_data: 'Moscow' }
}

const cityOptions = {
    "reply_markup": {
        "inline_keyboard": [
            [cities.ODESA, cities.LVIV, cities.KYIV],
            [cities.WARSZAWA, cities.BREST, cities.MINSK],
            [cities.ASTANA, cities.KISHINEV, cities.MOSCOW],
        ]
    }
};

function start(bot, chatId) {
    bot.sendMessage(chatId, messages.start, cityOptions);
}

async function saveCity(bot, query) {
    const chatId = query.message.chat.id;
    const city = query.data;

    await UserService.saveUserCity(chatId, city);

    bot.sendMessage(chatId, messages.citySaved(city));
}

module.exports = { start, saveCity };
