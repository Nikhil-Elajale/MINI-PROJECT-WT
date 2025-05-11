import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db.js'; // Ensure db.js exports a MySQL connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// CREATE
app.post('/api/users', (req, res) => {
  const {
    full_name,
    email,
    phone,
    batch,
    course,
    current_company,
    designation,
    location
  } = req.body;

  console.log('Incoming Data:', req.body);

  const sql = `
    INSERT INTO users 
    (full_name, email, phone, batch, course, current_company, designation, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [full_name, email, phone, batch, course, current_company, designation, location], (err, result) => {
    if (err) {
      console.error('Insert Error:', err);
      return res.status(500).json({ error: 'Failed to insert', details: err });
    }
    res.status(201).json({ message: 'User added', id: result.insertId });
  });
});

// READ
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch users', details: err });
    res.json(result);
  });
});

// UPDATE
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const {
    full_name,
    email,
    phone,
    batch,
    course,
    current_company,
    designation,
    location
  } = req.body;

  const sql = `
    UPDATE users 
    SET full_name = ?, email = ?, phone = ?, batch = ?, course = ?, current_company = ?, designation = ?, location = ?
    WHERE id = ?
  `;

  db.query(sql, [full_name, email, phone, batch, course, current_company, designation, location, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update', details: err });
    res.json({ message: 'User updated' });
  });
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete', details: err });
    res.json({ message: 'User deleted' });
  });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
