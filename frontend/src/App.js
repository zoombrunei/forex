import React, { useState, useEffect } from 'react';
import RatesTable from './components/RatesTable';
import './styles/App.css';

function App() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/rates');
      if (!response.ok) {
        throw new Error('Failed to fetch rates');
      }
      const data = await response.json();
      setRates(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rates on mount
  useEffect(() => {
    fetchRates();
  }, []);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRates();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>💱 Forex Dashboard</h1>
        <p>Live Exchange Rates Paired with SGD</p>
      </header>

      <div className="container">
        <div className="info-bar">
          <div className="status">
            {loading ? (
              <span className="status-loading">🔄 Updating...</span>
            ) : error ? (
              <span className="status-error">❌ {error}</span>
            ) : (
              <span className="status-success">✅ Live • Last update: {lastUpdate}</span>
            )}
          </div>
          <button onClick={fetchRates} disabled={loading} className="refresh-btn">
            🔄 Refresh Now
          </button>
        </div>

        {error && (
          <div className="error-box">
            <h3>⚠️ Error</h3>
            <p>{error}</p>
            <p className="error-help">
              Make sure the backend is running on <code>http://localhost:5000</code>
            </p>
          </div>
        )}

        {rates && <RatesTable rates={rates} />}

        {!rates && !loading && !error && (
          <div className="loading-box">
            <p>Loading rates...</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Auto-refreshes every 10 seconds • Data from ExchangeRate-API</p>
      </footer>
    </div>
  );
}

export default App;
