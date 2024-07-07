app.get('/api/transactions/combined', async (req, res) => {
    const { month } = req.query;
  
    try {
      const transactionsResponse = await axios.get(`http://localhost:${PORT}/api/transactions`, {
        params: { month },
      });
      const statsResponse = await axios.get(`http://localhost:${PORT}/api/transactions/stats`, {
        params: { month },
      });
      const chartResponse = await axios.get(`http://localhost:${PORT}/api/transactions/chart`, {
        params: { month },
      });
      const pieResponse = await axios.get(`http://localhost:${PORT}/api/transactions/pie`, {
        params: { month },
      });
  
      res.send({
        transactions: transactionsResponse.data.transactions,
        stats: statsResponse.data,
        chartData: chartResponse.data,
        pieData: pieResponse.data,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching combined data', error });
    }
  });
  