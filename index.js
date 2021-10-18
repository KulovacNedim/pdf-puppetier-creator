const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  const page = await browser.newPage();
  await page.goto('https://blog.risingstack.com', {
    waitUntil: 'networkidle0',
  });
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf;
}

const port = 4000;

app.listen(port, () => {
  console.log(`listening at the port ${port}`);
});

app.get('/foo', async (req, res) => {
  const pdf = await printPDF();
  res.setHeader('Content-Length', 10000);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  res.send(pdf);
});
