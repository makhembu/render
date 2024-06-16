const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/api/render', async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
      headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://portal.paxum.com/scp-mobile', { waitUntil: 'networkidle2' });
    const content = await page.content();
    await browser.close();

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error('Error rendering page:', error);
    res.status(500).send('Error rendering page');
  }
});

module.exports = app;
