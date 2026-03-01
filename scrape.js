const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=58',
  'https://sanand0.github.io/tdsdata/js_table/?seed=59',
  'https://sanand0.github.io/tdsdata/js_table/?seed=60',
  'https://sanand0.github.io/tdsdata/js_table/?seed=61',
  'https://sanand0.github.io/tdsdata/js_table/?seed=62',
  'https://sanand0.github.io/tdsdata/js_table/?seed=63',
  'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  'https://sanand0.github.io/tdsdata/js_table/?seed=65',
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
  'https://sanand0.github.io/tdsdata/js_table/?seed=67',
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  var grandTotal = 0;

  for (var i = 0; i < urls.length; i++) {
    var url = urls[i];
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table');

    var pageSum = await page.evaluate(function() {
      var sum = 0;
      var cells = document.querySelectorAll('td');
      for (var j = 0; j < cells.length; j++) {
        var val = parseFloat(cells[j].innerText);
        if (!isNaN(val)) {
          sum += val;
        }
      }
      return sum;
    });

    console.log('Sum for seed ' + (58 + i) + ': ' + pageSum);
    grandTotal += pageSum;
  }

  console.log('Total sum across all pages: ' + grandTotal);
  await browser.close();
}

main();
