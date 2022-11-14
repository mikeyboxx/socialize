
const Sequelize = require('sequelize');
const moment = require('moment');
const {Post} = require("../models");
const getCocktailApiData = require("../utils/getCocktailApiData");
const getHoroscopeApiData = require("../utils/getHoroscopeApiData");
const getDogApiData = require("../utils/getDogApiData");
const getMemeApiData = require("../utils/getMemeApiData")

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
      const api_idArr = [1, 2, 3, 4];
      
      const api_id = api_idArr[Math.floor(Math.random() * api_idArr.length)];
      let response = {};
      switch (api_id){
        case 1:  response = await getCocktailApiData();
          break;
        case 2:  response = await getHoroscopeApiData();
          break;
        case 3:  response = await getDogApiData();
          break;
        case 4: response = await getMemeApiData();
          break;
      }
      
      // console.log(response);
      const datajson = JSON.stringify(response);

      const dbPostData = await Post.create({
        api_json: datajson,
        api_id,
        user_id: 1
      });

      console.log(`${fgCyan}created Post id = `,dbPostData.get(({ plain: true })).id);
      console.log(`${fgCyan}api id = `,api_id);

    } catch(err) {
      console.log(err);
      clearInterval(timer);
      return;
    };
  },3000);
}

module.exports = {apiDaemon, apiCleanupDaemon};