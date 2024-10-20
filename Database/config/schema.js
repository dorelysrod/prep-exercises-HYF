import db from './db.js';

const setupDatabase = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS recipes (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id CHAR(36),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS steps (
        id CHAR(36) PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id CHAR(36) PRIMARY KEY,
        recipe_id CHAR(36),
        ingredient_id CHAR(36),
        quantity VARCHAR(50),
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS recipe_steps (
        id CHAR(36) PRIMARY KEY,
        recipe_id CHAR(36),
        step_id CHAR(36),
        step_order INT,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (step_id) REFERENCES steps(id)
      );
    `);

    console.log('Database setup completed.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
};

setupDatabase();
