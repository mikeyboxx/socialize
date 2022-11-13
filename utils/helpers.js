const moment = require('moment');

module.exports = {
  formatDate: (date) => {
    return moment(moment(moment.parseZone(date).local().format())).format('LLLL');
  },
  isEqual: function (v1, v2) {    
    return v1 === v2;
  }
};
