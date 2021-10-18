const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const html = `<html>
<body>
<h1>My First Heading</h1>
<p>My first paragraph.</p>
</body>
</html>`;

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: 'domcontentloaded',
  });
  const pdf = await page.pdf({ format: 'Letter', landscape: true });

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
