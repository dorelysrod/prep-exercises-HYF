import db from './db.js';

const setupDatabase = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id CHAR(36),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS units (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS steps (
        id CHAR(36) PRIMARY KEY,
        description TEXT NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id CHAR(36) PRIMARY KEY,
        recipe_id CHAR(36),
        ingredient_id CHAR(36),
        quantity DECIMAL(5,2), -- Change this if you need it as VARCHAR(50)
        unit_id CHAR(36), -- Include unit_id here
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
        FOREIGN KEY (unit_id) REFERENCES units(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS recipe_steps (
        id CHAR(36) PRIMARY KEY,
        recipe_id CHAR(36),
        step_id CHAR(36),
        step_order INT,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (step_id) REFERENCES steps(id)
      );
    `);

    try {
      await db.query(`
        ALTER TABLE recipe_ingredients 
        ADD COLUMN unit_id CHAR(36);
      `);
      console.log("Column 'unit_id' added successfully.");
    } catch (error) {
      console.error("Could not add 'unit_id' column. It may already exist.", error);
    }


    try {
      await db.query(`
        ALTER TABLE recipe_ingredients 
        ADD CONSTRAINT fk_unit_id FOREIGN KEY (unit_id) REFERENCES units(id);
      `);
      console.log("Foreign key constraint 'fk_unit_id' added successfully.");
    } catch (error) {
      console.error("Could not add foreign key constraint 'fk_unit_id'.", error);
    }

    console.log('Database setup completed with normalized structure.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
};

setupDatabase();
