/*
this is api request without api key authorization in typescript


app.get('/customers', async (req: Request, res: Response) => {
  try {
    const allCustomers = await prisma.customers.findMany();
    res.json(allCustomers);
  } catch (error) {
    console.error('Error retrieving customers', error);
    res.status(500).send('Error');
  }
});

app.post('/customers', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone_number, address, password } = req.body;
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
    console.error('Error creating customer', error);
    res.status(500).send('Error');
  }
});

app.patch('/customers/:customer_id', async (req: Request, res: Response) => {
  try {
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
    console.error('Error updating customer', error);
    res.status(500).send('Error');
  }
});

app.delete('/customers/:customer_id', async (req: Request, res: Response) => {
  try {
    const { customer_id } = req.params;
    await prisma.customers.delete({
      where: {
        customer_id: parseInt(customer_id),
      },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting customer', error);
    res.status(500).send('Error');
  }
});


*/