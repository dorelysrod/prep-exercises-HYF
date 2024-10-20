import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

const seedData = async () => {
  try {

    const categories = [
      { id: uuidv4(), name: 'Japanese' },
      { id: uuidv4(), name: 'Cake' },
      { id: uuidv4(), name: 'Vegetarian' },
    ];

    for (const category of categories) {
      await db.execute(
        'INSERT INTO categories (id, name) VALUES (?, ?)',
        [category.id, category.name]
      );
    }

    
    const recipes = [
      {
        id: uuidv4(),
        name: 'Sushi',
        description: 'Sushi with fresh fish and rice.',
        categoryId: categories[0].id, 
      },
      {
        id: uuidv4(),
        name: 'Cheesecake',
        description: 'Creamy cheesecake with a graham cracker crust.',
        categoryId: categories[1].id, 
      },
      {
        id: uuidv4(),
        name: 'Vegetable Stir Fry',
        description: 'A healthy mix of vegetables stir-fried with soy sauce.',
        categoryId: categories[2].id, 
      },
    ];

    for (const recipe of recipes) {
      await db.execute(
        'INSERT INTO recipes (id, name, description, category_id) VALUES (?, ?, ?, ?)',
        [recipe.id, recipe.name, recipe.description, recipe.categoryId]
      );
    }


    const ingredients = [
      { id: uuidv4(), name: 'Rice' },
      { id: uuidv4(), name: 'Fish' },
      { id: uuidv4(), name: 'Cheese' },
      { id: uuidv4(), name: 'Vegetables' },
      { id: uuidv4(), name: 'Soy Sauce' },
    ];

    for (const ingredient of ingredients) {
      await db.execute(
        'INSERT INTO ingredients (id, name) VALUES (?, ?)',
        [ingredient.id, ingredient.name]
      );
    }

 
    const steps = [
      { id: uuidv4(), description: 'Cook rice.' },
      { id: uuidv4(), description: 'Add fresh fish.' },
      { id: uuidv4(), description: 'Mix vegetables with soy sauce.' },
      { id: uuidv4(), description: 'Bake cheesecake.' },
    ];

    for (const step of steps) {
      await db.execute(
        'INSERT INTO steps (id, description) VALUES (?, ?)',
        [step.id, step.description]
      );
    }


    const recipeIngredients = [
      { id: uuidv4(), recipeId: recipes[0].id, ingredientId: ingredients[0].id, quantity: '200g' }, 
      { id: uuidv4(), recipeId: recipes[0].id, ingredientId: ingredients[1].id, quantity: '100g' }, 
      { id: uuidv4(), recipeId: recipes[1].id, ingredientId: ingredients[2].id, quantity: '300g' }, 
      { id: uuidv4(), recipeId: recipes[2].id, ingredientId: ingredients[3].id, quantity: '150g' }, 
      { id: uuidv4(), recipeId: recipes[2].id, ingredientId: ingredients[4].id, quantity: '50ml' }, 
    ];

    for (const recipeIngredient of recipeIngredients) {
      await db.execute(
        'INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, quantity) VALUES (?, ?, ?, ?)',
        [recipeIngredient.id, recipeIngredient.recipeId, recipeIngredient.ingredientId, recipeIngredient.quantity]
      );
    }

   
    const recipeSteps = [
      { id: uuidv4(), recipeId: recipes[0].id, stepId: steps[0].id, stepOrder: 1 }, 
      { id: uuidv4(), recipeId: recipes[0].id, stepId: steps[1].id, stepOrder: 2 }, 
      { id: uuidv4(), recipeId: recipes[2].id, stepId: steps[2].id, stepOrder: 1 },
      { id: uuidv4(), recipeId: recipes[1].id, stepId: steps[3].id, stepOrder: 1 }, 
    ];

    for (const recipeStep of recipeSteps) {
      await db.execute(
        'INSERT INTO recipe_steps (id, recipe_id, step_id, step_order) VALUES (?, ?, ?, ?)',
        [recipeStep.id, recipeStep.recipeId, recipeStep.stepId, recipeStep.stepOrder]
      );
    }

    console.log('Sample data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.end(); 
  }
};

seedData();
