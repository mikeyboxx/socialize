const moment = require('moment');

module.exports = {
  formatDate: (date) => {
    return moment(date).format('LLLL');
    // return date.toLocaleString();
  },
  isEqual: function (v1, v2) {    
    return v1 === v2;
  }
};
