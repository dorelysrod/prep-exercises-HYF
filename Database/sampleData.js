import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

const seedData = async () => {
  try {
    const units = [
      { id: uuidv4(), name: 'grams' },
      { id: uuidv4(), name: 'cups' },
      { id: uuidv4(), name: 'tablespoons' },
      { id: uuidv4(), name: 'pieces' }
    ];

    for (const unit of units) {
      await db.query('INSERT INTO units (id, name) VALUES (?, ?)', [unit.id, unit.name]);
    }

    const categories = [
      { id: uuidv4(), name: 'Japanese' },
      { id: uuidv4(), name: 'Cake' },
      { id: uuidv4(), name: 'Vegetarian' },
      { id: uuidv4(), name: 'No-Bake' },
      { id: uuidv4(), name: 'Vegan' }
    ];

    for (const category of categories) {
      await db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [category.id, category.name]);
    }

    const recipes = [
      { id: uuidv4(), name: 'Sushi', description: 'Sushi with fresh fish and rice.', categoryId: categories[0].id },
      { id: uuidv4(), name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust.', categoryId: categories[1].id }
    ];

    for (const recipe of recipes) {
      await db.query('INSERT INTO recipes (id, name, description, category_id) VALUES (?, ?, ?, ?)', 
        [recipe.id, recipe.name, recipe.description, recipe.categoryId]);
    }

    const ingredients = [
      { id: uuidv4(), name: 'Rice' },
      { id: uuidv4(), name: 'Fish' },
      { id: uuidv4(), name: 'Cream Cheese' }
    ];

    for (const ingredient of ingredients) {
      await db.query('INSERT INTO ingredients (id, name) VALUES (?, ?)', [ingredient.id, ingredient.name]);
    }

    const steps = [
      { id: uuidv4(), description: 'Cook rice.' },
      { id: uuidv4(), description: 'Add fresh fish.' }
    ];

    for (const step of steps) {
      await db.query('INSERT INTO steps (id, description) VALUES (?, ?)', [step.id, step.description]);
    }

    const recipeIngredients = [
      {
        id: uuidv4(),
        recipe_id: recipes[0].id,
        ingredient_id: ingredients[0].id,
        quantity: 200,
        unit_id: units[0].id
      },
      {
        id: uuidv4(),
        recipe_id: recipes[0].id,
        ingredient_id: ingredients[1].id,
        quantity: 2,
        unit_id: units[3].id
      }
    ];

    for (const recipeIngredient of recipeIngredients) {
      await db.query(
        'INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity, unit_id) VALUES (?, ?, ?, ?, ?)',
        [recipeIngredient.id, recipeIngredient.recipe_id, recipeIngredient.ingredient_id, recipeIngredient.quantity, recipeIngredient.unit_id]
      );
    }

    console.log('Data seeded successfully with normalized structure.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.end();
  }
};

seedData();