import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const colorScheme = searchParams.get('colorScheme') || 'dark';

  if (!url) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-blink-features=CSSBackdropFilter']
    });
    const page = await browser.newPage();

    // Use a more robust waitUntil for modern JS-heavy pages
    await page.goto(url, { waitUntil: 'networkidle0' }); 

    await page.evaluate(() => {
      const elementsToHide = document.querySelectorAll('[data-hide-print]');
      elementsToHide.forEach(element => {
        (element as HTMLElement).style.display = 'none';
      });
    });

    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: colorScheme }]);

    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();

   const body = Buffer.from(pdfUint8Array) as any;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv-export.pdf"',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}