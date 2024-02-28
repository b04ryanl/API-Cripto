const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Ruta para obtener el valor de una criptomoneda
app.get('/crypto/:coin', async (req, res) => {
  const coin = req.params.coin.toLowerCase();

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const data = response.data;
    
    if (data[coin]) {
      res.json({ value: data[coin].usd });
    } else {
      res.status(404).json({ error: 'Criptomoneda no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el valor de la criptomoneda' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
