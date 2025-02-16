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

    console.log(data); // Inspect the structure in the console

    // Clear out the container before rendering fresh data
    stockContainer.innerHTML = '';

    // Depending on the API, the data might be an array or nested under a key.
    // Here we'll assume it's an array of stock objects.
    if (Array.isArray(data)) {
      data.forEach(stock => {
        const symbol = stock.symbol || 'N/A';
        const price = stock.regularMarketPrice || 'N/A';
        const change = stock.regularMarketChange || 'N/A';
        const percentChange = stock.regularMarketChangePercent || 'N/A';

        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock-info';
        stockDiv.innerHTML = `
          <h2>${symbol}</h2>
          <p>Price: $${price}</p>
          <p>Change: ${change} (${percentChange}%)</p>
        `;
        stockContainer.appendChild(stockDiv);
      });
    } else if (data && data.data) {
      // If your API nests the results in a 'data' property
      data.data.forEach(stock => {
        const symbol = stock.symbol || 'N/A';
        const price = stock.regularMarketPrice || 'N/A';
        const change = stock.regularMarketChange || 'N/A';
        const percentChange = stock.regularMarketChangePercent || 'N/A';

        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock-info';
        stockDiv.innerHTML = `
          <h2>${symbol}</h2>
          <p>Price: $${price}</p>
          <p>Change: ${change} (${percentChange}%)</p>
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
