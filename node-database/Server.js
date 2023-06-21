const express = require('express');
const { Pool } = require('pg');
// const fs = require('fs');


const app = express();
const port = 5000;

const pool = new Pool({
    user: 'egarageproject',
    host: 'postgresql-egarage.postgres.database.azure.com',
    database: 'eGarage',
    password: 'Admin!$$$!Login@123',
    port: 5432, // Default PostgreSQL port
    // ssl: {
    //   rejectUnauthorized: false,
    //   ca: fs.readFileSync('path/to/ca-certificate.pem').toString(),
    // },
});

app.use(express.json());

// app.post('/register', async (req, res) => {
//     try {
//       const { name, email, phone, password } = req.body;
  
//       // Insert the registration data into the database
//       const query = 'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)';
//       const values = [name, email, phone, password];
//       await pool.query(query, values);
  
//       res.status(200).json({ message: 'Registration successful' });
//     } catch (error) {
//       console.error('Error during registration:', error);
//       res.status(500).json({ error: 'An error occurred during registration' });
//     }
// });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// GET method to fetch all customers
app.get('/customers', async (req, res) => {
  try {
    const query = 'SELECT * FROM customers';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST method to add a new customer
app.post('/customers', async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, address, password } = req.body;
    const query = 'INSERT INTO customers (first_name, last_name, email, phone_number, address, password) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [first_name, last_name, email, phone_number, address, password];

    await pool.query(query, values);
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const result = await pool.query('SELECT email, password FROM customers WHERE email = $1 AND password = $2', [email, password]);
//       const customer = result.rows[0];
  
//       if (!customer) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//       }
  
//       return res.json({ message: 'Login successful' });
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});









// const express = require('express');
// const { Pool } = require('pg');

// const app = express();
// const port = 5000;

// // Create a pool for connecting to the PostgreSQL database
// const pool = new Pool({
//   user: 'egarageproject',
//   host: 'postgresql-egarage.postgres.database.azure.com',
//   database: 'eGarage',
//   password: 'Admin!$$$!Login@123',
//   port: 5432, // Default PostgreSQL port
// });



// // Endpoint for handling the login request
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('Email:', email);
//     console.log('Password:', password);
  
//     try {
//       // Query the database to check if the email and password match
//       const query = 'SELECT * FROM customers WHERE email = $1 AND password = $2';
//       const result = await pool.query(query, [email, password]);
  
//       if (result.rowCount === 1) {
//         // Successful login
//         res.status(200).json({ message: 'Login successful' });
//       } else {
//         // Invalid email or password
//         res.status(401).json({ message: 'Invalid email or password' });
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
// });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });








// const express = require('express');
// const app = express();
// const { Pool } = require('pg');
// require('dotenv').config();

// const port = process.env.SERVER_PORT || 5000;

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });


// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       // Query the database for the given email and password
//       const query = {
//         text: 'SELECT * FROM customers WHERE email = $1 AND password = $2',
//         values: [email, password],
//       };
  
//       const result = await pool.query(query);
  
//       // Check if a matching record is found
//       if (result.rows.length === 1) {
//         res.status(200).json({ message: 'Login successful' });
//       } else {
//         res.status(401).json({ error: 'Invalid email or password' });
//       }
//     } catch (error) {
//       console.error('Error executing login query:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });


// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

