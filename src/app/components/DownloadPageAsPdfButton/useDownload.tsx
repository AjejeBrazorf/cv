import { useCallback, useState } from 'react'

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false)


  const download = useCallback(async (url: string) => {

    setIsDownloading(true)
    const urlObj = new URL(url)
    urlObj.searchParams.set('pdf', 'true')

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const colorScheme = prefersDark ? 'dark' : 'light'
    urlObj.searchParams.set('colorScheme', colorScheme)

    const pdfPageUrl = urlObj.toString()
    const apiUrl = `/api/generate-pdf?url=${encodeURIComponent(pdfPageUrl)}`

    console.log(apiUrl)

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Error generating PDF')
      }
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'page.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error(error)
    }
    setIsDownloading(false)
  }, [])

  return {
    isDownloading,
    download
  }
}
