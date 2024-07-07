import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './transactions-page.css';

const TransactionsPage = () => {
  const [month, setMonth] = useState('03');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCombinedData();
  }, [month, search, page]);

  const fetchCombinedData = async () => {
    const response = await axios.get('http://localhost:5000/api/transactions/combined', {
      params: { month, search, page },
    });

    setTransactions(response.data.transactions);
    setStats(response.data.stats);
    setChartData(response.data.chartData);
    setPieData(response.data.pieData);
  };

  return (
    <div className="transactions-page">
      <h1>Transactions</h1>
      <div>
        <label htmlFor="month">Select Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
            <option key={m} value={m}>
              {new Date(2020, m - 1, 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      <div className="stats">
        <h2>Statistics</h2>
        <p>Total Sale Amount: ${stats.totalSale}</p>
        <p>Total Sold Items: {stats.soldItems}</p>
        <p>Total Not Sold Items: {stats.notSoldItems}</p>
      </div>

      <div className="chart">
        <h2>Bar Chart</h2>
        {/* Render Bar Chart using chartData */}
      </div>

      <div className="pie-chart">
        <h2>Pie Chart</h2>
        {/* Render Pie Chart using pieData */}
      </div>
    </div>
  );
};

export default TransactionsPage;
