



const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/movie-booking-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const Transaction = require('./models/Transaction');

app.get('/api/seed', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    // Clear the collection and insert new data
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    res.send({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error seeding database', error });
  }
});
