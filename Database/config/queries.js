import db from '../db.js';

export const getVegetarianRecipesWithPotatoes = async () => {
  const query = `
    SELECT r.name 
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE r.category_id IN (SELECT id FROM categories WHERE name = 'Vegetarian')
    AND i.name = 'Potatoes';
  `;
  const [results] = await db.query(query);
  return results;
};

export const getNoBakeCakes = async () => {
  const query = `
    SELECT r.name 
    FROM recipes r
    WHERE r.category_id IN (
      SELECT id FROM categories WHERE name = 'No-Bake' OR name = 'Cake'
    );
  `;
  const [results] = await db.query(query);
  return results;
};

export const getVeganAndJapaneseRecipes = async () => {
  const query = `
    SELECT r.name 
    FROM recipes r
    WHERE r.category_id IN (
      SELECT id FROM categories WHERE name = 'Vegan' OR name = 'Japanese'
    );
  `;
  const [results] = await db.query(query);
  return results;
};
