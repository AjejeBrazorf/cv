'use client'
import { FC, ReactNode, useEffect, useRef, use } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import styles from './PrintContainer.module.scss'

const DownloadPageAsPdfButton = dynamic(() => import('@/app/components/DownloadPageAsPdfButton/DownloadPageAsPdfButton'), { ssr: false })

const PrintContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const isPdfMode = searchParams.get('pdf') === 'true'

  useEffect(() => {
    if (!isPdfMode || !containerRef.current) return

    const container = containerRef.current
    const A4WidthPx = (210 * 96) / 25.4
    const containerWidth = container.offsetWidth
    
    // Using transform instead of zoom for better cross-browser/Puppeteer support
    if (containerWidth > A4WidthPx) {
      const scaleFactor = A4WidthPx / containerWidth
      container.style.transform = `scale(${scaleFactor * 1.05})` // Slight buffer
      container.style.transformOrigin = 'top left'
      container.style.width = `${containerWidth}px` // Lock width to prevent reflow
    }
  }, [isPdfMode])

  return (
    <div ref={containerRef} className={styles.printContainer}>
      {children}
      {!isPdfMode && (
        <div className={styles.actions}>
          <DownloadPageAsPdfButton />
        </div>
      )}
    </div>
  )
}

export default PrintContainer