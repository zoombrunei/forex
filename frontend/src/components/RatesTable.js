import React from 'react';
import '../styles/RatesTable.css';

function RatesTable({ rates }) {
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
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates.rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td className="currency-pair">
                <strong>{currency}/SGD</strong>
              </td>
              <td className="rate-value">{rate.toFixed(4)}</td>
              <td className="conversion">{rate.toFixed(4)} {currency}</td>
              <td className="reverse-conversion">{(1 / rate).toFixed(4)} SGD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RatesTable;
