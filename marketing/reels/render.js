// Renderiza un reel HTML a MP4 (1080x1920, 30 fps) de forma determinista.
// Uso: node render.js <archivo.html> <segundos> <salida.mp4>
// Requiere Playwright (Chromium) y ffmpeg.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const [, , html, secs, out] = process.argv;
const FPS = 30;
const frames = Math.round(parseFloat(secs) * FPS);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(html));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
    { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    const t = (i / FPS) * 1000;
    await page.evaluate((t) => {
      document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; });
      if (window.onFrame) window.onFrame(t / 1000);
    }, t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log('OK', out, frames, 'frames');
})();
