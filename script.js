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

// Function to fetch data for a single symbol
async function fetchStockForSymbol(symbol) {
  const endpoint = `https://real-time-finance-data.p.rapidapi.com/stock/v3/get-quote?symbol=${symbol}`;
  const response = await fetch(endpoint, options);
  const data = await response.json();
  return data;
}

// Function to fetch and render stock data for all symbols
async function fetchStockData() {
  // Clear out the container before rendering fresh data
  stockContainer.innerHTML = '';

  for (const symbol of symbols) {
    try {
      const data = await fetchStockForSymbol(symbol);
      
      // Extract key values from the API response.
      // Adjust these paths if your API response structure is different.
      const price = data.regularMarketPrice;
      const change = data.regularMarketChange;
      const percentChange = data.regularMarketChangePercent;

      // Build HTML output for this stock
      const stockDiv = document.createElement('div');
      stockDiv.className = 'stock-info';
      stockDiv.innerHTML = `
        <h2>${symbol}</h2>
        <p>Price: $${price !== undefined ? price : 'N/A'}</p>
        <p>Change: ${change !== undefined ? change : 'N/A'} (${percentChange !== undefined ? percentChange : 'N/A'}%)</p>
      `;
      stockContainer.appendChild(stockDiv);
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'stock-info error';
      errorDiv.innerHTML = `<h2>${symbol}</h2><p style="color:red;">Error fetching data</p>`;
      stockContainer.appendChild(errorDiv);
    }
  }
}

// Fetch on page load and then every 30 seconds (30000ms)
fetchStockData();
setInterval(fetchStockData, 30000);
