app.get('/api/transactions/stats', async (req, res) => {
    const { month } = req.query;
  
    const start = new Date(`2020-${month}-01`);
    const end = new Date(`2020-${month}-31`);
  
    try {
      const totalSale = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalSale: { $sum: '$price' } } },
      ]);
  
      const soldItems = await Transaction.countDocuments({
        dateOfSale: { $gte: start, $lt: end },
      });
  
      const notSoldItems = await Transaction.countDocuments({
        dateOfSale: { $lt: start },
      });
  
      res.send({
        totalSale: totalSale[0]?.totalSale || 0,
        soldItems,
        notSoldItems,
      });
    } catch (error) {
      res.status(500).send({ message: 'Error fetching statistics', error });
    }
  });
  