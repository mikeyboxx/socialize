const axios = require('axios');

const getMemeApiData = () => {
  return new Promise(async (resolve, reject)=> {
    try {
      const response = await axios.get(`https://api.imgflip.com/get_memes`);
      let {status, statusText, data} = response;
                    
      if (statusText !== 'OK') {
        reject({status: status, message: statusText});
        return;
      };
      // console.log(data.memes);
      const meme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
      return resolve(meme);

    } catch(err) {
      return reject(err)
    }
  })
}
  
module.exports = getMemeApiData;