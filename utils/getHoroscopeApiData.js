const axios = require('axios');

// get a random horoscope ny calling the aztro api
const getHoroscopeApiData = () => {
  return new Promise(async (resolve, reject)=> {
    const horoscopeArr = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    const horoscopeIconArr = ['♈️','♉️','♒️','♑️','♋️','♌️','♍️','♎️','♏️','♐️','♓️','♊️'];

    const rnd = Math.floor(Math.random() * horoscopeArr.length);
    const sign = horoscopeArr[rnd];
    const icon = horoscopeIconArr[rnd];

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

      data.zodiac_sign = sign;
      data.zodiac_icon = icon;

      return resolve(data);
    } catch(err) {
      return reject(err)
    }
  })
}

module.exports = getHoroscopeApiData;
