import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

const seedData = async () => {
  try {
    const categories = [
      { id: uuidv4(), name: 'Japanese' },
      { id: uuidv4(), name: 'Cake' },
      { id: uuidv4(), name: 'Vegetarian' },
      { id: uuidv4(), name: 'No-Bake' },        
      { id: uuidv4(), name: 'Vegan' },          
      { id: uuidv4(), name: 'Gluten-Free' },    
    ];

    for (const category of categories) {
      await db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [category.id, category.name]);
    }

    const recipes = [
      { id: uuidv4(), name: 'Sushi', description: 'Sushi with fresh fish and rice.', categoryId: categories[0].id },
      { id: uuidv4(), name: 'Cheesecake', description: 'Creamy cheesecake with a graham cracker crust.', categoryId: categories[1].id },
      { id: uuidv4(), name: 'Vegetable Stir Fry', description: 'A healthy mix of vegetables stir-fried with soy sauce.', categoryId: categories[2].id },
      { id: uuidv4(), name: 'No-Bake Cheesecake', description: 'A quick and easy cheesecake that doesn’t require baking.', categoryId: categories[3].id }, 
      { id: uuidv4(), name: 'Roasted Brussels Sprouts', description: 'Delicious roasted Brussels sprouts with a crispy finish.', categoryId: categories[4].id }, 
      { id: uuidv4(), name: 'Mac & Cheese', description: 'Classic mac and cheese with cheddar.', categoryId: categories[2].id }, 
      { id: uuidv4(), name: 'Tamagoyaki Japanese Omelette', description: 'A sweet and savory Japanese omelette.', categoryId: categories[0].id }, 
    ];

    for (const recipe of recipes) {
      await db.query('INSERT INTO recipes (id, name, description, category_id) VALUES (?, ?, ?, ?)', 
        [recipe.id, recipe.name, recipe.description, recipe.categoryId]);
    }

    const ingredients = [
      { id: uuidv4(), name: 'Rice' },
      { id: uuidv4(), name: 'Fish' },
      { id: uuidv4(), name: 'Cheese' },
      { id: uuidv4(), name: 'Vegetables' },
      { id: uuidv4(), name: 'Soy Sauce' },
      { id: uuidv4(), name: 'Condensed milk' },  
      { id: uuidv4(), name: 'Cream Cheese' },    
      { id: uuidv4(), name: 'Lemon Juice' },     
      { id: uuidv4(), name: 'Pie Crust' },       
      { id: uuidv4(), name: 'Cherry Jam' },      
      { id: uuidv4(), name: 'Brussels Sprouts' }, 
      { id: uuidv4(), name: 'Macaroni' },        
      { id: uuidv4(), name: 'Butter' },          
      { id: uuidv4(), name: 'Eggs' },            
      { id: uuidv4(), name: 'Sugar' },         
    ];

    for (const ingredient of ingredients) {
      await db.query('INSERT INTO ingredients (id, name) VALUES (?, ?)', [ingredient.id, ingredient.name]);
    }

    const steps = [
      { id: uuidv4(), description: 'Cook rice.' },
      { id: uuidv4(), description: 'Add fresh fish.' },
      { id: uuidv4(), description: 'Mix vegetables with soy sauce.' },
      { id: uuidv4(), description: 'Beat Cream Cheese.' }, 
      { id: uuidv4(), description: 'Add condensed milk and blend.' }, 
      { id: uuidv4(), description: 'Spread the Cherry Jam.' }, 
      { id: uuidv4(), description: 'Preheat the oven.' },      
      { id: uuidv4(), description: 'Mix ingredients in a bowl.' }, 
      { id: uuidv4(), description: 'Cook Macaroni for 8 minutes.' }, 
      { id: uuidv4(), description: 'Beat the eggs.' }, 
    ];

    for (const step of steps) {
      await db.query('INSERT INTO steps (id, description) VALUES (?, ?)', [step.id, step.description]);
    }


    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    db.end();
  }
};

seedData();
