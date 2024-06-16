const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  let browser;
  try {
    // Launch Puppeteer with necessary arguments
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://portal.paxum.com/scp-mobile', { waitUntil: 'networkidle2' });

    // Get the content of the page
    const content = await page.content();

    // Close the browser
    await browser.close();

    // Send the content as the response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    console.error('Error rendering page:', error);
    res.status(500).send('Error rendering page');
  }
};
