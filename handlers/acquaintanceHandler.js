const messages = require('../messages/ru');

function acquaintance(bot, chatId) {
    bot.sendMessage(chatId, messages.acquaintance);
}

module.exports = { acquaintance };
