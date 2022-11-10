const axios = require('axios');
const getCocktailApiData = () => {
  return new Promise(async (resolve, reject)=> {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
      let {status, statusText, data} = response;
                    
      if (statusText !== 'OK') {
        reject({status: status, message: statusText});
        return;
      };

      data = data.drinks[0]; // always contains one element in the array
            
      // deconstruct only the necessary data
      const {
          strDrink: drink,
          strGlass: glass,
          strDrinkThumb: drinkImageUrl,
          strInstructions: instructions
      } = data;

      // create an ingredients array containing objects with data generated from static property names
      const ingredients =[];
      for (let i = 1; i <= 15; i++ )
          if (data[`strIngredient${i}`] !== null)  // do not push null values
              ingredients.push({
                  ingredient: data[`strIngredient${i}`],
                  measure: data[`strMeasure${i}`]
          });

      // assemble the data to be returned        
      const newCocktail = {
          drink,
          glass,
          drinkImageUrl,
          instructions,
          ingredients
      };   

      console.log(newCocktail);

      return resolve(newCocktail);
    } catch(err) {
      return reject(err)
    }
  })
}

module.exports = getCocktailApiData;
