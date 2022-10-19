let symbols = document.querySelector("#symbols");
let updateNow = document.querySelector("#updateNow");
let table = document.querySelector("#table");

let latestQuote = {};
let allQuotes = [];

async function getQuote() {
  const response = await fetch(
    `http://candidateservices.allegient.com/randomQuote/quote?symbols=${symbols.value}`
  );
  let data = await response.json();
  latestQuote = data.quotes;
  allQuotes = [...latestQuote, ...allQuotes];
  updateTable(allQuotes);
}

function updateTable(allQuotes) {
  let tableheader = document.createElement("tr");
  let symbolheader = document.createElement("th");
  let lastpriceheader = document.createElement("th");
  let timeheader = document.createElement("th");

  let symbolheadertext = document.createTextNode("Symbol");
  let lastpriceheadertext = document.createTextNode("Price");
  let timeheadertext = document.createTextNode("Price Date");

  tableheader.appendChild(symbolheader);
  tableheader.appendChild(lastpriceheader);
  tableheader.appendChild(timeheader);
  table.appendChild(tableheader);

  for (let i = 0; i < allQuotes.length; i++) {
    symbolheader.appendChild(symbolheadertext);
    lastpriceheader.appendChild(lastpriceheadertext);
    timeheader.appendChild(timeheadertext);

    let tablerow = document.createElement("tr");

    let quotesymbolcell = document.createElement("td");
    let quotelatestpricecell = document.createElement("td");
    let timeofquotecell = document.createElement("td");

    let quotesymbol = document.createTextNode(allQuotes[i].symbol);
    let quotelastprice = document.createTextNode(allQuotes[i].lastTradePrice);

    quotesymbolcell.appendChild(quotesymbol);
    quotelatestpricecell.appendChild(quotelastprice);

    tablerow.appendChild(quotesymbolcell);
    tablerow.appendChild(quotelatestpricecell);

    table.appendChild(tablerow);
  }
}

function clearTable() {
  allQuotes = [];
  updateTable();
}

updateNow.addEventListener("click", getQuote);
