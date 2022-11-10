const axios = require('axios');
const getHoroscopeApiData = () => {
  return new Promise(async (resolve, reject)=> {
    const horoscopeArr = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagitarius', 'capricorn', 'aquarius', 'pisces'];

    const sign = horoscopeArr[Math.floor(Math.random() * horoscopeArr.length)];

    try {
      const response = await axios({
        method: 'POST',
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`,
        headers: {
            'X-RapidAPI-Key': '7e3d61519emsh748d639db16a48fp154cddjsn756669cf1b3e',
            'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
      });

      let {status, statusText, data} = response;
                    
      if (statusText !== 'OK') {
        reject({status: status, message: statusText});
        return;
      };

      return resolve(data);
    } catch(err) {
      return reject(err)
    }
  })
}

module.exports = getHoroscopeApiData;
