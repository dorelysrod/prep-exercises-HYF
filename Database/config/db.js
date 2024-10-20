import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser', 
  password: 'hyfpassword', 
  database: 'userdb', 
});

export default db;