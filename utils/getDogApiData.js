// const axios = require('axios');
// const getDogApiData = () => {
//     return new Promise(async (resolve, reject)=> {
//       try {
//             console.log('"DOGGGGGG",')
//         const response = await axios.get(`https://dog.ceo/api/breeds/image/random`);
//         console.log('"DOGGGGGG",')
//         console.log(response);
//         let {status, message} = response;
                      
//         if (status !== 'success') {
//           reject({status, message});
//           return;
//         };
  
  
//         return resolve(response);
//       } catch(err) {
//         return reject(err)
//       }
//     })
//   }
  
// module.exports = getDogApiData;
