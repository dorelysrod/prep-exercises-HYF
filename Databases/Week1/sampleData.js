import db from './connection-db.js';

const insertSampleData = async () => {
  try {
    await db.query('USE `Recipes-app`');

    const categories = ['Japanese', 'Cake', 'Vegetarian'];
    const categoryIds = {};

    //Insert categories or get existing category IDs
    for (const category of categories) {
      const categoryId = await getCategoryIdByName(category);
      if (!categoryId) {
        const [result] = await db.query(`INSERT INTO Category (name) VALUES (?)`, [category]);
        console.log(`Category "${category}" successfully created.`);
        categoryIds[category] = result.insertId;
      } else {
        console.log(`Category "${category}" already exists.`);
        categoryIds[category] = categoryId;
      }
    }

    // Insert recipes and link to categories, ingredients, and steps
    const recipes = [
      {
        name: 'Matcha Cheesecake',
        description: 'A creamy and rich cheesecake with the earthy flavor of matcha.',
        categories: ['Cake', 'Japanese'],
        ingredients: [
          { name: 'Cream Cheese', quantity: '500', unit: 'grams' },
          { name: 'Sugar', quantity: '200', unit: 'grams' },
          { name: 'Matcha Powder', quantity: '2', unit: 'tablespoons' },
          { name: 'Eggs', quantity: '3', unit: 'large' },
          { name: 'Heavy Cream', quantity: '200', unit: 'ml' },
          { name: 'Graham Crackers', quantity: '200', unit: 'grams' },
          { name: 'Butter', quantity: '100', unit: 'grams' }
        ],
        steps: [
          'Preheat oven to 325°F (160°C).',
          'Crush graham crackers and mix with melted butter to form a crust.',
          'Press crust into a springform pan and bake for 10 minutes.',
          'Mix cream cheese, sugar, and matcha powder until smooth.',
          'Add eggs one at a time, then mix in heavy cream.',
          'Pour filling onto crust and bake for 50 minutes.',
          'Let cool and refrigerate before serving.'
        ]
      }
    ];

    for (const recipe of recipes) {
      const recipeId = await getRecipeIdByName(recipe.name);
      if (!recipeId) {
        const [result] = await db.query(`INSERT INTO Recipe (name, description) VALUES (?, ?)`, [recipe.name, recipe.description]);
        console.log(`Recipe "${recipe.name}" successfully created.`);
        recipe.id = result.insertId;
      } else {
        console.log(`Recipe "${recipe.name}" already exists.`);
        recipe.id = recipeId;
      }

      // Link recipe to categories
      for (const category of recipe.categories) {
        const categoryId = categoryIds[category];

        // Check if the link between recipe and category already exists
        const [linkExists] = await db.query(
          `SELECT 1 FROM RecipeCategory WHERE recipe_id = ? AND category_id = ?`,
          [recipe.id, categoryId]
        );

        if (linkExists.length === 0) {
          // If not linked, insert the link
          const [linkResult] = await db.query(
            `INSERT INTO RecipeCategory (recipe_id, category_id) VALUES (?, ?)`,
            [recipe.id, categoryId]
          );
          console.log(`Linked Recipe "${recipe.name}" with Category "${category}".`);
        } else {
          // If already linked
          console.log(`Recipe "${recipe.name}" is already linked with Category "${category}".`);
        }
      }

      //  Add ingredients and link them to the recipe
      for (const ingredient of recipe.ingredients) {
        const ingredientId = await getIngredientIdByName(ingredient.name);
        if (!ingredientId) {
          const [result] = await db.query(`INSERT INTO Ingredient (name) VALUES (?)`, [ingredient.name]);
          console.log(`Ingredient "${ingredient.name}" successfully created.`);
          ingredient.id = result.insertId;
        } else {
          console.log(`Ingredient "${ingredient.name}" already exists.`);
          ingredient.id = ingredientId;
        }

        // Check if the link between recipe and ingredient already exists
        const [linkExists] = await db.query(
          `SELECT 1 FROM RecipeIngredient WHERE recipe_id = ? AND ingredient_id = ?`,
          [recipe.id, ingredient.id]
        );

        if (linkExists.length === 0) {
          const [linkResult] = await db.query(
            `INSERT INTO RecipeIngredient (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)`,
            [recipe.id, ingredient.id, ingredient.quantity, ingredient.unit]
          );
          console.log(`Linked Ingredient "${ingredient.name}" with Recipe "${recipe.name}".`);
        } else {
          console.log(`Ingredient "${ingredient.name}" is already linked with Recipe "${recipe.name}".`);
        }
      }

      // Add steps and link them to the recipe
      for (let i = 0; i < recipe.steps.length; i++) {
        const stepDescription = recipe.steps[i];
        const stepId = await getStepIdByDescription(stepDescription);
        if (!stepId) {
          const [result] = await db.query(`INSERT INTO Step (description) VALUES (?)`, [stepDescription]);
          console.log(`Step "${stepDescription}" successfully created.`);
          recipe.steps[i] = { id: result.insertId, description: stepDescription };
        } else {
          console.log(`Step "${stepDescription}" already exists.`);
          recipe.steps[i] = { id: stepId, description: stepDescription };
        }

        // Check if the link between recipe and step already exists
        const [linkExists] = await db.query(
          `SELECT 1 FROM RecipeStep WHERE recipe_id = ? AND step_id = ?`,
          [recipe.id, recipe.steps[i].id]
        );

        if (linkExists.length === 0) {
          const [linkResult] = await db.query(
            `INSERT INTO RecipeStep (recipe_id, step_id, step_order) VALUES (?, ?, ?)`,
            [recipe.id, recipe.steps[i].id, i + 1]
          );
          console.log(`Linked Step "${stepDescription}" with Recipe "${recipe.name}" at order ${i + 1}.`);
        } else {
          console.log(`Step "${stepDescription}" is already linked with Recipe "${recipe.name}".`);
        }
      }
    }

    console.log('Data insertion completed.');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  }
};

// Helper functions to get existing IDs
const getCategoryIdByName = async (name) => {
  const [rows] = await db.query(`SELECT id FROM Category WHERE name = ?`, [name]);
  return rows[0]?.id || null;
};

const getRecipeIdByName = async (name) => {
  const [rows] = await db.query(`SELECT id FROM Recipe WHERE name = ?`, [name]);
  return rows[0]?.id || null;
};

const getIngredientIdByName = async (name) => {
  const [rows] = await db.query(`SELECT id FROM Ingredient WHERE name = ?`, [name]);
  return rows[0]?.id || null;
};

const getStepIdByDescription = async (description) => {
  const [rows] = await db.query(`SELECT id FROM Step WHERE description = ?`, [description]);
  return rows[0]?.id || null;
};

insertSampleData();