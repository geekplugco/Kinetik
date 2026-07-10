import { chromium } from 'playwright';

const [,, url, outfile, selector, widthArg, heightArg] = process.argv;
const width = Number(widthArg || 1440);
const height = Number(heightArg || 1000);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: 'load', timeout: 30000 });
await page.waitForTimeout(1000);
await page.evaluate(() => {
  document.querySelectorAll('[loading="lazy"]').forEach((el) => el.removeAttribute('loading'));
});
const target = page.locator(selector).first();
await target.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await target.screenshot({ path: outfile });
await browser.close();
console.log('saved', outfile);
