import React, { useState, useEffect } from 'react';
import '../styles/RatesTable.css';

function RatesTable({ rates }) {
  const [previousRates, setPreviousRates] = useState({});
  const [rateChanges, setRateChanges] = useState({});

  // Track rate changes whenever rates update
  useEffect(() => {
    if (!rates || !rates.rates) return;

    const changes = {};
    
    Object.entries(rates.rates).forEach(([currency, currentRate]) => {
      const previousRate = previousRates[currency];
      
      if (previousRate !== undefined) {
        if (currentRate > previousRate) {
          changes[currency] = 'up'; // Currency strengthening
        } else if (currentRate < previousRate) {
          changes[currency] = 'down'; // Currency dropping
        } else {
          changes[currency] = 'stable'; // No change
        }
      }
    });

    setRateChanges(changes);
    setPreviousRates(rates.rates);
  }, [rates]);

  if (!rates || !rates.rates) {
    return <div>No rates available</div>;
  }

  return (
    <div className="rates-container">
      <table className="rates-table">
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Rate</th>
            <th>1 SGD = </th>
            <th>1 Currency = </th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates.rates).map(([currency, rate]) => {
            const change = rateChanges[currency];
            const rowClass = change === 'up' ? 'rate-up' : change === 'down' ? 'rate-down' : '';
            
            return (
              <tr key={currency} className={rowClass}>
                <td className="currency-pair">
                  <strong>{currency}/SGD</strong>
                </td>
                <td className="rate-value">{rate.toFixed(4)}</td>
                <td className="conversion">{rate.toFixed(4)} {currency}</td>
                <td className="reverse-conversion">{(1 / rate).toFixed(4)} SGD</td>
                <td className="change-indicator">
                  {change === 'up' ? '📈 Up' : change === 'down' ? '📉 Down' : '➡️ Stable'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RatesTable;
