import mysql from "mysql2";
  
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sanatantech'
});
 
export default db;