// script.js (excerpt where we build each stock card)

// Destructure fields from 'stock'
const {
  symbol = 'N/A',
  name = 'N/A',
  price = 'N/A',
  open = 'N/A',
  high = 'N/A',
  low = 'N/A',
  volume = 'N/A',
  previous_close: previousClose = 'N/A',
  change = 'N/A',
  change_percent: changePercent = 'N/A',
  pre_or_post_market: preOrPostMarket = 'N/A',
  pre_or_post_market_change: preOrPostMarketChange = 'N/A',
  pre_or_post_market_change_percent: preOrPostMarketChangePercent = 'N/A',
  last_update_utc: lastUpdate = 'N/A'
} = stock;

// Create the card
const stockDiv = document.createElement('div');
stockDiv.className = 'stock-info';

// Apply color-coding based on change
const numericChange = parseFloat(change);
if (!isNaN(numericChange)) {
  if (numericChange > 0) {
    stockDiv.classList.add('positive-change');
  } else if (numericChange < 0) {
    stockDiv.classList.add('negative-change');
  }
}

// Fill in the card content
stockDiv.innerHTML = `
  <h2>${name} (${symbol})</h2>
  <p><strong>Price:</strong> $${price}</p>
  <p><strong>Open:</strong> $${open} | <strong>High:</strong> $${high} | <strong>Low:</strong> $${low}</p>
  <p><strong>Previous Close:</strong> $${previousClose}</p>
  <p><strong>Change:</strong> ${change} (${changePercent}%)</p>
  <p><strong>Pre/Post Market:</strong> $${preOrPostMarket} (Change: ${preOrPostMarketChange}, ${preOrPostMarketChangePercent}%)</p>
  <p><strong>Volume:</strong> ${volume}</p>
  <p><strong>Last Update:</strong> ${lastUpdate}</p>
`;

// Append to container
stockContainer.appendChild(stockDiv);
