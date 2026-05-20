require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Enable CORS for ALL requests - no clicking required!
app.use(cors());
app.use(express.json());

// Cache for rates (1 minute)
let ratesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60000; // 1 minute

// Currency pairs to display (20 currencies)
const CURRENCY_PAIRS = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'INR',
  'MYR', 'IDR', 'VND', 'TWD', 'THB', 'PHP', 'KRW', 'TRY', 'AED', 'SAR'
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Main rates endpoint
app.get('/api/rates', async (req, res) => {
  try {
    // Check if cache is still valid
    if (ratesCache && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached rates');
      return res.json(ratesCache);
    }

    if (!API_KEY) {
      return res.status(400).json({ 
        error: 'API_KEY not configured. Please set API_KEY in .env file.',
        message: 'Get a free API key from https://www.exchangerate-api.com'
      });
    }

    // Fetch from ExchangeRate-API
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/SGD`;
    const response = await axios.get(url);

    if (response.data.result === 'error') {
      return res.status(400).json({ 
        error: response.data['error-type'],
        message: 'Failed to fetch exchange rates. Check your API key.'
      });
    }

    // Filter and format rates
    const rates = {};
    CURRENCY_PAIRS.forEach(currency => {
      if (response.data.conversion_rates[currency]) {
        rates[currency] = parseFloat(response.data.conversion_rates[currency].toFixed(4));
      }
    });

    const result = {
      base: 'SGD',
      rates: rates,
      timestamp: new Date().toISOString(),
      source: 'ExchangeRate-API'
    };

    // Cache the result
    ratesCache = result;
    cacheTimestamp = Date.now();

    res.json(result);
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch exchange rates',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Forex Dashboard Backend running on http://localhost:${PORT}`);
  console.log(`📊 Get rates at http://localhost:${PORT}/api/rates`);
  console.log(`✅ CORS enabled - all requests allowed (no clicking needed!)`);
  console.log(`📈 Tracking 20 currencies against SGD`);
});
