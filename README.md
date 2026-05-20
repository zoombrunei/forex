# Forex Dashboard - Live SGD Exchange Rates

A real-time forex dashboard displaying live exchange rates paired with SGD (Singapore Dollar).

## Features

- 🌍 Live forex rates for 10+ currency pairs with SGD
- 🔄 Auto-refresh every 10 seconds
- 💾 Smart caching to minimize API calls
- 🎨 Modern, responsive UI
- ⚡ Fast and lightweight
- 🔒 Secure API key handling

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **API:** ExchangeRate-API (free tier)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Free API key from [ExchangeRate-API](https://www.exchangerate-api.com)

### Setup Backend

```bash
cd backend
npm install
echo "API_KEY=your_api_key_here" > .env
echo "PORT=5000" >> .env
npm start
```

The backend will run on `http://localhost:5000`

### Setup Frontend

```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### GET /api/rates

Returns current exchange rates for all major currencies paired with SGD.

**Response:**
```json
{
  "base": "SGD",
  "rates": {
    "USD": 0.74,
    "EUR": 0.68,
    "GBP": 0.58
  },
  "timestamp": "2026-05-20T10:30:00Z"
}
```

## Environment Variables

Create a `.env` file in the `backend` folder:

```
API_KEY=your_exchangerate_api_key
PORT=5000
NODE_ENV=development
```

## Currency Pairs Supported

- USD/SGD
- EUR/SGD
- GBP/SGD
- JPY/SGD
- AUD/SGD
- CAD/SGD
- CHF/SGD
- CNY/SGD
- HKD/SGD
- INR/SGD

## Project Structure

```
forex/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   ├── styles/
│   │   └── index.js
│   ├── package.json
│   └── public/
├── README.md
└── .gitignore
```

## Development

The backend includes:
- CORS enabled for all origins (no clicking required!)
- Rate limiting to prevent API abuse
- 1-minute caching layer
- Error handling

## License

MIT

---

Made with ❤️ for SGD traders and investors