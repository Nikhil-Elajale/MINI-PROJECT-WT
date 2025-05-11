import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CDAC',
  database: 'react_app'
});

db.connect((err) => {
  if (err) {
    console.error('DB Connection Error:', err);
  } else {
    console.log('MySQL connected');
  }
});

export default db;
