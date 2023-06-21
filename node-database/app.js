const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

// PostgreSQL database configuration
const pool = new Pool({
    user: 'egarageproject',
    host: 'postgresql-egarage.postgres.database.azure.com',
    database: 'eGarage',
    password: 'Onesight@tech.com',
    port: 5432, // Default PostgreSQL port
    ssl: true
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(bodyParser.json());


// GET request - Retrieve all customers
app.get('/customers', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM customers');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error');
    }
});

// POST request - Insert a new customer
app.post('/customers', async (req, res) => {
    try {
        const { first_name, last_name, email, phone_number, address, password } = req.body;
        const client = await pool.connect();
        const query = 'INSERT INTO customers (first_name, last_name, email, phone_number, address, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [first_name, last_name, email, phone_number, address, password];
        const result = await client.query(query, values);
        const insertedCustomer = result.rows[0];
        client.release();
        res.json(insertedCustomer);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).send('Error');
    }
});


app.patch('/customers/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const { first_name, last_name, email, phone_number, address, password } = req.body;
        const query = 'UPDATE customers SET first_name = $1, last_name = $2, email = $3, phone_number = $4, address = $5, password = $6 WHERE customer_id = $7';
        await pool.query(query, [first_name, last_name, email, phone_number, address, password, customer_id]);
        res.sendStatus(204);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/customers/:customer_id', async (req, res) => {
    try {
        const { customer_id } = req.params;
        const query = 'DELETE FROM customers WHERE customer_id = $1';
        await pool.query(query, [customer_id]);
        res.sendStatus(204);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = 5000; // the port number you want to use
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// app.get('/customers', async (req, res) => {
//     try {
//         const query = 'SELECT * FROM customers';
//         const result = await pool.query(query);
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/customers', async (req, res) => {
//     try {
//         const { first_name, last_name, email, phone_number, address, password } = req.body;
//         const query = 'INSERT INTO customers(first_name, last_name, email, phone_number, address, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING customer_id';

//         if (!first_name) {
//             return res.status(400).json({ error: 'First name is required' });
//         }

//         const result = await pool.query(query, [first_name, last_name, email, phone_number, address, password]);
//         const { customer_id } = result.rows[0];

//         res.status(201).json({ customer_id });
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });