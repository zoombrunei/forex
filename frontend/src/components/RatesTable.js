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

  const invertedCurrencies = rates.invertedCurrencies || [];

  return (
    <div className="rates-container">
      <table className="rates-table">
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Rate</th>
            <th>Display</th>
            <th>Reverse</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates.rates).map(([currency, rate]) => {
            const change = rateChanges[currency];
            const rowClass = change === 'up' ? 'rate-up' : change === 'down' ? 'rate-down' : '';
            const isInverted = invertedCurrencies.includes(currency);
            
            // Format display based on currency type
            const displayLabel = isInverted 
              ? `1 ${currency} =` 
              : `1 SGD =`;
            const displayValue = isInverted
              ? `${rate.toFixed(4)} SGD`
              : `${rate.toFixed(4)} ${currency}`;
            const reverseLabel = isInverted
              ? `1 SGD =`
              : `1 ${currency} =`;
            const reverseValue = isInverted
              ? `${(1 / rate).toFixed(4)} ${currency}`
              : `${(1 / rate).toFixed(4)} SGD`;
            
            return (
              <tr key={currency} className={rowClass}>
                <td className="currency-pair">
                  <strong>{isInverted ? `${currency}/SGD` : `SGD/${currency}`}</strong>
                </td>
                <td className="rate-value">{rate.toFixed(4)}</td>
                <td className="conversion">{displayLabel} {displayValue}</td>
                <td className="reverse-conversion">{reverseLabel} {reverseValue}</td>
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
