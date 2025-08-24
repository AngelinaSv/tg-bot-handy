const dayjs = require('dayjs');

function prepareDate(date) {
    return dayjs(date).format('D MMMM, H:mm');
}

module.exports = { prepareDate };
