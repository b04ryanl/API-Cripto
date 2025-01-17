const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/crypto/:coin', async (req, res) => {
  const coin = req.params.coin.toLowerCase();

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const data = response.data;

    console.log(`Coin: ${coin}, Data:`, data);

    if (data[coin]) {
      res.json({ value: data[coin].usd });
    } else {
      res.status(404).json({ error: 'No Found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Start Server Port ${PORT}`);
});
