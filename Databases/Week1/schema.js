import db from './connection-db.js';

const createDatabaseAndTables = async () => {
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS `Recipes-app`');
    console.log('Database created or already exists.');

     // use the database
    await db.query('USE `Recipes-app`');

    const createTablesSQL = [
      {
        query: `CREATE TABLE IF NOT EXISTS Recipe (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) NOT NULL,
                  description TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`, 
        table: 'Recipe' 
      },
      {
        query: `CREATE TABLE IF NOT EXISTS Category (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) NOT NULL
                )`, 
        table: 'Category'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeCategory (
                  recipe_id INT,
                  category_id INT,
                  FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
                  FOREIGN KEY (category_id) REFERENCES Category(id),
                  PRIMARY KEY (recipe_id, category_id)
                )`, 
        table: 'RecipeCategory'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS Ingredient (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) NOT NULL
                )`, 
        table: 'Ingredient'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeIngredient (
                  recipe_id INT,
                  ingredient_id INT,
                  quantity VARCHAR(50),
                  unit VARCHAR(50),
                  FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
                  FOREIGN KEY (ingredient_id) REFERENCES Ingredient(id),
                  PRIMARY KEY (recipe_id, ingredient_id)
                )`, 
        table: 'RecipeIngredient'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS Step (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  description TEXT NOT NULL
                )`, 
        table: 'Step'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeStep (
                  recipe_id INT,
                  step_id INT,
                  step_order INT,
                  FOREIGN KEY (recipe_id) REFERENCES Recipe(id),
                  FOREIGN KEY (step_id) REFERENCES Step(id),
                  PRIMARY KEY (recipe_id, step_id)
                )`, 
        table: 'RecipeStep'
      }
    ];

    for (const { query, table } of createTablesSQL) {
      // Check if the table already exists
      const [rows] = await db.query(`SHOW TABLES LIKE '${table}'`);
      
      if (rows.length > 0) {
        console.log(`${table} table already exists.`);
      } else {
        // Create the table if it doesn't exist
        await db.query(query);
        console.log(`${table} table created successfully.`);
      }
    }

  } catch (error) {
    console.error('Error creating database or tables:', error.message);
  }
};

createDatabaseAndTables();
