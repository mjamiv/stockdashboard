// script.js

const stockContainer = document.getElementById('stock-container');

// Update these symbols as desired
const symbols = ['MSTR', 'MARA', 'RIOT', 'IBIT'];

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b83abbc192mshf353298bef11115p1864e4jsn6542ca66d145',  // Replace with your key if needed
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};

async function fetchStockData() {
  try {
    const symbolParam = encodeURIComponent(symbols.join(', '));
    const endpoint = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${symbolParam}&language=en`;
    console.log('Fetching from:', endpoint);

    // Fetch the raw text in case the API prefix includes '1'
    let rawText = await (await fetch(endpoint, options)).text();
    console.log('Raw text:', rawText);

    // Remove leading '1' if present
    if (rawText.startsWith('1')) {
      rawText = rawText.substring(1).trim();
      console.log('Stripped leading "1":', rawText);
    }

    // Parse the JSON
    const parsed = JSON.parse(rawText);
    console.log('Parsed data:', parsed);

    // Clear the container
    stockContainer.innerHTML = '';

    // Check if parsed.data is an array of stock objects
    if (parsed && Array.isArray(parsed.data)) {
      parsed.data.forEach(stock => {
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

        // Create the card element
        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock-info';

        // Color-code the background based on price change
        const numericChange = parseFloat(change);
        if (!isNaN(numericChange)) {
          if (numericChange > 0) {
            stockDiv.classList.add('positive-change');
          } else if (numericChange < 0) {
            stockDiv.classList.add('negative-change');
          }
        }

        // Bui
