// script.js

const stockContainer = document.getElementById('stock-container');

// Symbols we want to track. You can add more symbols if needed.
const symbols = ['AAPL', 'MSFT'];

// RapidAPI details (replace with your actual values)
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'YOUR_RAPIDAPI_HOST'
  }
};

// Function to fetch stock data
async function fetchStockData() {
  try {
    // We can batch multiple symbols in one request if the API allows
    // Example endpoint (adjust according to your specific RapidAPI docs):
    //   /stock/v3/get-quote?symbol=AAPL,MSFT
    const endpoint = `https://real-time-finance-data.p.rapidapi.com/stock/v3/get-quote?symbol=${symbols.join(',')}`;
    
    const response = await fetch(endpoint, options);
    const data = await response.json();

    // This data structure might vary depending on the API. 
    // Check your API’s documentation for the exact JSON format.
    // For demonstration, let's assume we get an array or an object with a "quotes" key:
    const quotes = data.quotes || data; // adjust if needed

    // Clear out the container before rendering fresh data
    stockContainer.innerHTML = '';

    // Build HTML output
    quotes.forEach(quote => {
      const symbol = quote.symbol;
      const price = quote.regularMarketPrice;
      const change = quote.regularMarketChange;
      const percentChange = quote.regularMarketChangePercent;

      const stockDiv = document.createElement('div');
      stockDiv.className = 'stock-info';

      stockDiv.innerHTML = `
        <h2>${symbol}</h2>
        <p>Price: $${price}</p>
        <p>Change: ${change} (${percentChange}%)</p>
      `;

      stockContainer.appendChild(stockDiv);
    });

  } catch (error) {
    console.error('Error fetching stock data:', error);
    stockContainer.innerHTML = `<p style="color:red;">Error fetching data. Check console.</p>`;
  }
}

// Fetch once on page load
fetchStockData();

// Set interval to fetch every 30 seconds
setInterval(fetchStockData, 30_000);
