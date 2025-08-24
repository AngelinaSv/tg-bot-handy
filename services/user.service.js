const db = require('../db');

class UserService {
    async saveUserCity(chatId, city) {
        await db.query(
            `INSERT INTO users(chat_id, city) 
            VALUES ($1, $2) 
            ON CONFLICT (chat_id) DO UPDATE SET city = $2`,
            [chatId, city]
        );
    }

    async getUserCity(chatId) {
        const res = await db.query('SELECT city FROM users WHERE chat_id = $1', [chatId]);
        return res.rows[0]?.city || null;
    }
}

module.exports = new UserService();
