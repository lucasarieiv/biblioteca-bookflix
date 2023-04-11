import mysql from 'mysql2';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'biblioteca'
}).promise();