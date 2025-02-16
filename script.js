// script.js

const stockContainer = document.getElementById('stock-container');
const symbols = ['RIOT', 'MSTR', 'IBIT', 'MARA'];

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b83abbc192mshf353298bef11115p1864e4jsn6542ca66d145',
    'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
  }
};

async function fetchStockData() {
  try {
    const symbolParam = encodeURIComponent(symbols.join(', '));
    const endpoint = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${symbolParam}&language=en`;

    // Sometimes the response might have an extra "1" at the start.
    let text = await (await fetch(endpoint, options)).text();
    if (text.startsWith('1')) {
      text = text.substring(1).trim();
    }
    
    const data = JSON.parse(text);
    
    // Clear the container for fresh data.
    stockContainer.innerHTML = '';

    // Use the data array inside the top-level JSON object.
    if (data && Array.isArray(data.data)) {
      data.data.forEach(stock => {
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

// Initial fetch and refresh every 30 seconds.
fetchStockData();
setInterval(fetchStockData, 30000);
