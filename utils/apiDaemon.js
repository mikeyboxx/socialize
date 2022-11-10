const axios = require('axios');
const Sequelize = require('sequelize');
const moment = require('moment');
const {Post} = require("../models");

const op = Sequelize.Op;
const fgCyan = '\x1b[36m';

const apiCleanupDaemon = () => {
  const timer = setInterval(async ()=>{
    try {
      
      const START_DATE = moment('00010101', 'YYYYMMDD').utc();
      const END_DATE = moment().subtract(15, 'seconds').utc();
      
      const posts = await Post.destroy({
        where: {
          created_at: {
            [op.between]: [
              START_DATE,
              END_DATE,
            ]
          },
          api_json: {
            [op.gt]: [""]
          }
        }
      });
      console.log(`${fgCyan}number of Post recs deleted = `, posts);

    } catch(err) {
      clearInterval(timer);
      return;
    };
  },5000);

}

const apiDaemon = () => {
  const timer = setInterval(async ()=>{
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
      const {status, statusText, data} = response;
                  
      if (statusText !== 'OK') {
        console.log({status: status, message: 'Could not retrieve data'});
        clearInterval(timer);
        return;
      };
      const datajson = JSON.stringify(data);

      const dbPostData = await Post.create({
        api_json: datajson,
        user_id: 1
      });

      console.log(`${fgCyan}created Post id = `,dbPostData.get(({ plain: true })).id);

    } catch(err) {
      clearInterval(timer);
      return;
    };
  },3000);

}

module.exports = {apiDaemon, apiCleanupDaemon};