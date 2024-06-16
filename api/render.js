const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
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
};
