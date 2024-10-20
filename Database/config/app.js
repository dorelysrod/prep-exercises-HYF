import { 
    getVegetarianRecipesWithPotatoes, 
    getNoBakeCakes, 
    getVeganAndJapaneseRecipes 
  } from './queries.js'; 
  
  const executeQueries = async () => {
    try {
      const vegetarianRecipes = await getVegetarianRecipesWithPotatoes();
      console.log('Vegetarian Recipes with Potatoes:', vegetarianRecipes);
  
      const noBakeCakes = await getNoBakeCakes();
      console.log('No-Bake Cakes:', noBakeCakes);
  
      const veganJapaneseRecipes = await getVeganAndJapaneseRecipes();
      console.log('Vegan and Japanese Recipes:', veganJapaneseRecipes);
      
    } catch (error) {
      console.error('Error retrieving recipes:', error);
    }
  };
  
  executeQueries();
  