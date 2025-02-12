'use client';

import type { FC } from 'react';
import { useSearchParams } from 'next/navigation';

interface DownloadPageAsPdfButtonProps {
  url?: string
}

const DownloadPageAsPdfButton: FC<DownloadPageAsPdfButtonProps> = ({url}) => {
  const searchParams = useSearchParams();
  // If the URL includes ?pdf=true, do not render the button.
  const isPdf = searchParams.get('pdf') === 'true';
  if (isPdf) return null;

  const handleDownload = () => {
    // Get the current URL and append ?pdf=true so the download button is hidden in the PDF.
    const currentUrl = url || window.location.href;
    const urlObj = new URL(currentUrl);
    urlObj.searchParams.set('pdf', 'true');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const colorScheme = prefersDark ? 'dark' : 'light';
    urlObj.searchParams.set('colorScheme', colorScheme);

    const pdfPageUrl = urlObj.toString();
    const apiUrl = `/api/generate-pdf?url=${encodeURIComponent(pdfPageUrl)}`;
    window.open(apiUrl, '_blank');
  };

  return (
    <button onClick={handleDownload} data-hide-print="true">
      Download PDF
    </button>
  );
};

export default DownloadPageAsPdfButton;
