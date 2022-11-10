const axios = require('axios');
const Sequelize = require('sequelize');
const moment = require('moment');
const {Post} = require("../models");

const op = Sequelize.Op;



const apiCleanupDaemon = () => {
  console.log('here');
  const timer = setInterval(async ()=>{
    try {
      console.log('here again');
   
      
      const START_DATE = moment('1/1/0001').utc();
      const END_DATE = moment().subtract(1, 'hours').utc();
      // const END_DATE =  moment().utc();
      
      const posts = await Post.findAll({
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

      console.log(posts.map(post => post.get(({ plain: true }))));

    } catch(err) {
      clearInterval(timer);
      return;
    };
  },3000);

}

const apiDaemon = () => {
  console.log('here');
  const timer = setInterval(async ()=>{
    try {
      console.log('here again');
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

      console.log(dbPostData.get(({ plain: true })));

    } catch(err) {
      clearInterval(timer);
      return;
    };
  },3000);

}

module.exports = {apiDaemon, apiCleanupDaemon};