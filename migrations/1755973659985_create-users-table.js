/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    chat_id: { type: 'bigint', primaryKey: true },
    city: { type: 'text' },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
