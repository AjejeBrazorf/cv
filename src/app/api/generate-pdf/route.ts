import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const colorScheme = request.nextUrl.searchParams.get('colorScheme') || 'dark';
  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-blink-features=CSSBackdropFilter'
      ]
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.evaluate(() => {
      const elementsToHide = document.querySelectorAll('[data-hide-print]');
      if (elementsToHide.length > 0) {
        elementsToHide.forEach(element => {
          (element as HTMLElement).style.display = 'none';
        })
      }
    });

    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: colorScheme }
    ]);


    const pdfBuffer = await page.pdf({
      format: 'A4',
      width: 1130,
      waitForFonts: true,
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=page.pdf'
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
