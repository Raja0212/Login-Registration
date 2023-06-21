import express, { Request, Response } from 'express';
import { PrismaClient, customers } from '@prisma/client';
import cors from 'cors';
import crypto from 'crypto';


const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api-keys', async (req: Request, res: Response) => {
  try {
      // Generate a random API key
      const apiKey = require('crypto').randomBytes(16).toString('hex');

      // Save the API key in the database
      const createdApiKey = await prisma.api_keys.create({
          data: {
              key: apiKey,
          },
      }); 

      // Send the API key in the response
      res.send(createdApiKey.key);
  } catch (error) {
      console.error('Error generating API key:', error);
      res.status(500).send('Error generating API key');
  }
});

app.get('/customers', async (req: Request, res: Response) => {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers.authorization;

    // Check if the API key is missing
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Lookup the API key in the database
    const apiKeyData = await prisma.api_keys.findUnique({
      where: {
        key: apiKey,
      },
    });

    // If the API key is not found in the database, return unauthorized
    if (!apiKeyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // If the API key is valid, retrieve all customers
    const allCustomers = await prisma.customers.findMany();
    res.json(allCustomers);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    res.status(500).send('Error');
  }
});


app.post('/customers', async (req: Request, res: Response) => {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers.authorization;

    // Check if the API key is missing
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Lookup the API key in the database
    const apiKeyData = await prisma.api_keys.findUnique({
      where: {
        key: apiKey,
      },
    });

    // If the API key is not found in the database, return unauthorized
    if (!apiKeyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Extract customer data from the request body
    const { first_name, last_name, email, phone_number, address, password } = req.body;

    // Create a new customer in the database
    const createdCustomer = await prisma.customers.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        address,
        password,
      },
    });

    res.json(createdCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).send('Error');
  }
});

app.patch('/customers/:customer_id', async (req: Request, res: Response) => {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers.authorization;

    // Check if the API key is missing
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Lookup the API key in the database
    const apiKeyData = await prisma.api_keys.findUnique({
      where: {
        key: apiKey,
      },
    });

    // If the API key is not found in the database, return unauthorized
    if (!apiKeyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const { customer_id } = req.params;
    const { first_name, last_name, email, phone_number, address, password } = req.body;
    const updatedCustomer = await prisma.customers.update({
      where: {
        customer_id: parseInt(customer_id),
      },
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        address,
        password,
      },
    });
    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Error');
  }
});

app.delete('/customers/:customer_id', async (req: Request, res: Response) => {
  try {
    // Get the API key from the request headers
    const apiKey = req.headers.authorization;

    // Check if the API key is missing
    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Lookup the API key in the database
    const apiKeyData = await prisma.api_keys.findUnique({
      where: {
        key: apiKey,
      },
    });

    // If the API key is not found in the database, return unauthorized
    if (!apiKeyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const { customer_id } = req.params;
    await prisma.customers.delete({
      where: {
        customer_id: parseInt(customer_id),
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).send('Error');
  }
});


const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
