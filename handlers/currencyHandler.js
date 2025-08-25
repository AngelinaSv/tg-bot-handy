const CurrencyService = require('../services/currency.service');
const messages = require('../messages/ru');

const MIN_SELECTED_CURRENCIES = 2;

const userSelections = {};

const currencies = {
    USD: { text: 'USD', callback_data: 'USD' },
    EUR: { text: 'EUR', callback_data: 'EUR' },
    UAH: { text: 'UAH', callback_data: 'UAH' },
    PLN: { text: 'PLN', callback_data: 'PLN' },
    BYN: { text: 'BYN', callback_data: 'BYN' },
    KZT: { text: 'KZT', callback_data: 'KZT' }, 
    MDL: { text: 'MDL', callback_data: 'MDL' },
    RUB: { text: 'RUB', callback_data: 'RUB' }
}

const currencyOptions = {
    "reply_markup": {
        "inline_keyboard": [
            [currencies.UAH],
            [currencies.USD, currencies.EUR],
            [currencies.PLN, currencies.BYN],
            [currencies.KZT, currencies.MDL, currencies.RUB],
        ]
    }
};

function generateCurrencyKeyboard(selected) {
    const keyboard = {
        inline_keyboard: [
            [ { text: selected.includes("UAH") ? "UAH ✅" : "UAH", callback_data: "UAH" } ],
            [ 
                { text: selected.includes("USD") ? "USD ✅" : "USD", callback_data: "USD" },
                { text: selected.includes("EUR") ? "EUR ✅" : "EUR", callback_data: "EUR" } 
            ],
            [ 
                { text: selected.includes("PLN") ? "PLN ✅" : "PLN", callback_data: "PLN" },
                { text: selected.includes("BYN") ? "BYN ✅" : "BYN", callback_data: "BYN" } 
            ],
            [ 
                { text: selected.includes("KZT") ? "KZT ✅" : "KZT", callback_data: "KZT" },
                { text: selected.includes("MDL") ? "MDL ✅" : "MDL", callback_data: "MDL" },
                { text: selected.includes("RUB") ? "RUB ✅" : "RUB", callback_data: "RUB" } 
            ]
        ]
    };

    if (selected.length === MIN_SELECTED_CURRENCIES) {
        const button = [{ text: 'Подтвердить', callback_data: "confirmSelection" }];
        keyboard.inline_keyboard.push(button);
    }

    return keyboard;
}

async function chooseCurrency(bot, chatId, query) {
    const { message } = query;
    const messageId = message ? message.message_id : null;
    const selectedCurrencies = userSelections[chatId]?.currencies;

    if (!selectedCurrencies) {
        return bot.sendMessage(chatId, messages.chooseCurrency, currencyOptions);
    }

    if (selectedCurrencies && (selectedCurrencies.length < MIN_SELECTED_CURRENCIES || !userSelections[chatId].confirmSelection)) {
        return bot.editMessageText(messages.chooseCurrency, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: generateCurrencyKeyboard(selectedCurrencies)
        });
    }

    return chooseAmount(bot, chatId);
}

function saveCurrency(chatId, query) {
    const currency = query.data;
    const selectedCurrencies = userSelections[chatId]?.currencies;

    if (!userSelections[chatId]) {
        userSelections[chatId] = { 
            currencies: [], 
            confirmSelection: false 
        };
    }

    if (query.data === 'confirmSelection') {
        userSelections[chatId].confirmSelection = true;
        return;
    }

    if (selectedCurrencies) {
        if (selectedCurrencies.includes(currency)) {
            selectedCurrencies.splice(selectedCurrencies.findIndex((c) => c === currency), 1);
        } else {
            selectedCurrencies.push(currency);
        }
    } else {
        userSelections[chatId].currencies.push(currency);
    }
}

function chooseAmount(bot, chatId) {
    if (userSelections[chatId]) {
        return bot.sendMessage(chatId, messages.chooseAmount(userSelections[chatId].currencies[0]));
    }
}

async function convert(bot, chatId, msg) {
    const currencies = userSelections[chatId].currencies;
    const [ from, to ] = currencies;

    if (currencies && currencies.length === MIN_SELECTED_CURRENCIES) {
        try {
            const data = await CurrencyService.convert(from, to, msg);
            return bot.sendMessage(chatId, messages.conversionResult(data, to));
        } catch (error) {
            console.log(error);
            return bot.sendMessage(chatId, messages.error);
        }
    }
}

function clearUserSelections(chatId) {
    delete userSelections[chatId];
}

module.exports = { chooseCurrency, convert, saveCurrency, clearUserSelections };
