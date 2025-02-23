const Sequelize = require('sequelize');
const moment = require('moment');
const {Post} = require("../models");
const getCocktailApiData = require("../utils/getCocktailApiData");
const getHoroscopeApiData = require("../utils/getHoroscopeApiData");
const getDogApiData = require("../utils/getDogApiData");
const getMemeApiData = require("../utils/getMemeApiData")

const op = Sequelize.Op;
const fgCyan = '\x1b[36m';

// every 15 seconds, delete old api generated posts
const apiCleanupDaemon = () => {
  const timer = setInterval(async ()=>{
    try {
      // generate a date range which will be used to delete old posts
      const START_DATE = moment('00010101', 'YYYYMMDD').utc();   // from the begining of time
      const END_DATE = moment().subtract(15, 'minutes').utc();   // subtract 15 mins from current date/time
      
      // delete all posts that have been generated by a bot, for a date range
      const posts = await Post.destroy({
        where: {
          created_at: {
            [op.between]: [
              START_DATE,
              END_DATE,
            ]
          },
          api_json: {  // contains json string of the api response
            [op.gt]: [""]
          }
        }
      });
      console.log(`${fgCyan}number of Post recs deleted = `, posts);

    } catch(err) {
      clearInterval(timer);
      return;
    };
  },3600000);

}

// Every 30 seconds, fetch api data, and save a json string of the response on the Post table.  Api to be called is randomly selected from api_idArr, which contains api_Ids, that identify which Api to call. 
const apiDaemon = () => {
  let api_id = 1;
  const timer = setInterval(async ()=>{
    try {
      // select a random api to call
      // const api_idArr = [1, 2, 3, 4];
      // const api_id = api_idArr[Math.floor(Math.random() * api_idArr.length)];

      let response = {};
      // invoke api function based on api id
      switch (api_id){
        case 1:  response = await getCocktailApiData();
          break;
        case 2:  response = await getHoroscopeApiData();
          break;
        case 3:  response = await getDogApiData();
          break;
        case 4:  response = await getMemeApiData();
          break;
      }
      console.log(response);

      // create a row on the Post table with the user_id of 1, which is setup on the User table as a bot user 
      const dbPostData = await Post.create({
        api_json: JSON.stringify(response),
        api_id,
        user_id: 1
      });

      // do a round-a-robin to to call a different api each tick
      (api_id === 4) ? api_id = 1 : api_id++;

      console.log(`${fgCyan}created Post id = `,dbPostData.get(({ plain: true })).id);
      console.log(`${fgCyan}api id = `,api_id);

    } catch(err) {
      console.log(err);
      clearInterval(timer);
      return;
    };
  },60000);
}

module.exports = {apiDaemon, apiCleanupDaemon};