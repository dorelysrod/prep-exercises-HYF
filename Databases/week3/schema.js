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
                  name VARCHAR(255) NOT NULL UNIQUE,
                  description TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )`, 
        table: 'Recipe' 
      },
      {
        query: `CREATE TABLE IF NOT EXISTS Category (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255) UNIQUE NOT NULL
                )`, 
        table: 'Category'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeCategory (
                  recipe_id INT NOT NULL,
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
                  name VARCHAR(255) UNIQUE NOT NULL
                )`, 
        table: 'Ingredient'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeIngredient (
                  recipe_id INT NOT NULL,
                  ingredient_id INT NOT NULL,
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
                  recipe_id INT NOT NULL,
                  description TEXT NOT NULL,
                  FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE
                )`, 
        table: 'Step'
      },
      {
        query: `CREATE TABLE IF NOT EXISTS RecipeStep (
                  recipe_id INT NOT NULL,
                  step_id INT NOT NULL,
                  step_order INT NOT NULL,
                  FOREIGN KEY (recipe_id) REFERENCES Recipe(id) ON DELETE CASCADE,
                  FOREIGN KEY (step_id) REFERENCES Step(id) ON DELETE CASCADE,
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
} finally {
await db.end();
console.log('Database connection closed.');
}
};

createDatabaseAndTables().catch(console.error);


/* Normalization Adjustments:
 1. The Recipe, Category and Ingredient table has a unique constraint on the name column to prevent duplicate recipes.
 2. The Step table includes a recipe_id to ensure steps belong to specific recipes
 3. Updated_at columns for the Recipe table to track changes. 

 The schema is normalized to 3NF, ensuring no redundancy, partial dependencies, or transitive dependencies. 

 Challenges faced if is thousands of recipes are added:
 Challenges include performance, scalability, data consistency, maintenance, and securing large datasets.
 for example: 
 
 Performance issues when querying the database.
 Difficulty in managing the relationships between tables.
 Protecting sensitive data becomes more challenging as the database grows. 
 Keeping data accurate and up-to-date can be difficult */