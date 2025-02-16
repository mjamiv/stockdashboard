// script.js

const stockContainer = document.getElementById('stock-container');

// Symbols we want to track.
const symbols = ['RIOT', 'MSTR'];

// RapidAPI details
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b83abbc192mshf353298bef11115p1864e4jsn6542ca66d145',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};

async function fetchStockData() {
  try {
    // Build the endpoint URL.
    // Joining symbols with a comma and space, then encoding produces "RIOT%2C%20MSTR"
    const symbolParam = encodeURIComponent(symbols.join(', '));
    const endpoint = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${symbolParam}&language=en`;

    const response = await fetch(endpoint, options);
    const data = await response.json();
    console.log(data); // Inspect the returned structure

    // Clear out the container before rendering fresh data
    stockContainer.innerHTML = '';

    // Assuming the API returns an array of stock objects
    if (Array.isArray(data)) {
      data.forEach(stock => {
        // Extract the desired fields
        const symbol = stock.symbol || 'N/A';
        const name = stock.name || 'N/A';
        const price = stock.price !== undefined ? stock.price : 'N/A';
        const open = stock.open !== undefined ? stock.open : 'N/A';
        const high = stock.high !== undefined ? stock.high : 'N/A';
        const low = stock.low !== undefined ? stock.low : 'N/A';
        const volume = stock.volume || 'N/A';
        const previousClose = stock.previous_close !== undefined ? stock.previous_close : 'N/A';
        const change = stock.change !== undefined ? stock.change : 'N/A';
        const changePercent = stock.change_percent !== undefined ? stock.change_percent : 'N/A';
        const preOrPostMarket = stock.pre_or_post_market !== undefined ? stock.pre_or_post_market : 'N/A';
        const preOrPostMarketChange = stock.pre_or_post_market_change !== undefined ? stock.pre_or_post_market_change : 'N/A';
        const preOrPostMarketChangePercent = stock.pre_or_post_market_change_percent !== undefined ? stock.pre_or_post_market_change_percent : 'N/A';
        const lastUpdate = stock.last_update_utc || 'N/A';

        // Build HTML output for each stock
        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock-info';
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
        stockContainer.appendChild(stockDiv);
      });
    } else if (data && Array.isArray(data.data)) {
      // In case the API nests results under a 'data' property
      data.data.forEach(stock => {
        const symbol = stock.symbol || 'N/A';
        const name = stock.name || 'N/A';
        const price = stock.price !== undefined ? stock.price : 'N/A';
        const open = stock.open !== undefined ? stock.open : 'N/A';
        const high = stock.high !== undefined ? stock.high : 'N/A';
        const low = stock.low !== undefined ? stock.low : 'N/A';
        const volume = stock.volume || 'N/A';
        const previousClose = stock.previous_close !== undefined ? stock.previous_close : 'N/A';
        const change = stock.change !== undefined ? stock.change : 'N/A';
        const changePercent = stock.change_percent !== undefined ? stock.change_percent : 'N/A';
        const preOrPostMarket = stock.pre_or_post_market !== undefined ? stock.pre_or_post_market : 'N/A';
        const preOrPostMarketChange = stock.pre_or_post_market_change !== undefined ? stock.pre_or_post_market_change : 'N/A';
        const preOrPostMarketChangePercent = stock.pre_or_post_market_change_percent !== undefined ? stock.pre_or_post_market_change_percent : 'N/A';
        const lastUpdate = stock.last_update_utc || 'N/A';

        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock-info';
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
        stockContainer.appendChild(stockDiv);
      });
    } else {
      stockContainer.innerHTML = `<p>No data available</p>`;
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    stockContainer.innerHTML = `<p style="color:red;">Error fetching data. Check console.</p>`;
  }
}

// Fetch on page load and then every 30 seconds (30000ms)
fetchStockData();
setInterval(fetchStockData, 30000);
