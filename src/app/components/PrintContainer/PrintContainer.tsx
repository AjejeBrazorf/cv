'use client'
import type { FC, ReactNode} from 'react'
import { useEffect, useRef } from 'react'
import React from 'react'
import { useSearchParams } from 'next/navigation'

import styles from './PrintContainer.module.scss';

const PrintContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if(searchParams.get('pdf') === null) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;
    const A4WidthPx = (210 * 96) / 25.4;
    const A4HeightPx = (297 * 96) / 25.4;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const scaleFactor = Math.min(A4WidthPx / containerWidth, A4HeightPx / containerHeight) * 1.6;

    container.style.zoom = scaleFactor.toString();
  }, [searchParams]);

  return <div ref={containerRef} className={styles.printContainer}>
      {children}
  </div>;
};

export default PrintContainer;
