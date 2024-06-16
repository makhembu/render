const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');

module.exports = async (req, res) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
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
    res.status(500).send('Error rendering page');
  }
};
