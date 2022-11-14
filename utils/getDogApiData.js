const axios = require('axios');

const getDogApiData = () => {
  return new Promise(async (resolve, reject)=> {
    try {
      const response = await axios.get(`https://dog.ceo/api/breeds/image/random`);
      let {status, statusText, data} = response;
                    
      if (statusText !== 'OK') {
        reject({status: status, message: statusText});
        return;
      };
      console.log(data)
      return resolve(data);
    } catch(err) {
      return reject(err)
    }
  })
}
  
module.exports = getDogApiData;
