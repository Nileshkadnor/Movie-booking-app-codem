app.get('/api/transactions', async (req, res) => {
    const { month, search = '', page = 1, perPage = 10 } = req.query;
  
    const start = new Date(`2020-${month}-01`);
    const end = new Date(`2020-${month}-31`);
  
    const query = {
      dateOfSale: { $gte: start, $lt: end },
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } },
      ],
    };
  
    try {
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));
      res.send({ transactions });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching transactions', error });
    }
  });
  