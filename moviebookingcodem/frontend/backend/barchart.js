app.get('/api/transactions/chart', async (req, res) => {
    const { month } = req.query;
  
    const start = new Date(`2020-${month}-01`);
    const end = new Date(`2020-${month}-31`);
  
    try {
      const data = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lt: end } } },
        {
          $bucket: {
            groupBy: '$price',
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: 'Other',
            output: {
              count: { $sum: 1 },
            },
          },
        },
      ]);
  
      const labels = [
        '0-100',
        '101-200',
        '201-300',
        '301-400',
        '401-500',
        '501-600',
        '601-700',
        '701-800',
        '801-900',
        '901-above',
      ];
  
      const values = data.map((d) => d.count);
  
      res.send({ labels, values });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching chart data', error });
    }
  });
  