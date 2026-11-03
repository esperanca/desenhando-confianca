const {DateTime} = require('luxon');

module.exports = function dateFilter(value) {
  const date = DateTime.fromJSDate(new Date(value)).setZone('America/Sao_Paulo');
  return date.isValid ? date.toFormat('dd/LL · HH:mm') : '';
};
