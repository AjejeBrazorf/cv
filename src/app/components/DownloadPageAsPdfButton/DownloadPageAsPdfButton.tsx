'use client'

import type { FC} from 'react';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { RiveEventPayload} from '@rive-app/react-canvas';
import { EventType, useRive, useStateMachineInput } from '@rive-app/react-canvas'
import clsx from 'clsx'

import { useDownload } from '@/app/components/DownloadPageAsPdfButton/useDownload'

import styles from './DownloadPageAsPdfButton.module.scss'
import ButtonRiv from './asset/DownloadButton.riv'

interface DownloadPageAsPdfButtonProps {
  url?: string
}

const RIVE_CONFIG = {
  artboard: 'Button',
  stateMachine: 'Download',
  inputs: {
    triggers: {
      stop: 'stop',
      start: 'start',
    },
    states: {
      hover: 'buttonHovered',
    },
  },
  states: {
    start: 'start download',
    download: 'downloading',
    stop: 'stop download',
  },
}

const DownloadPageAsPdfButton: FC<DownloadPageAsPdfButtonProps> = ({ url }) => {
  const searchParams = useSearchParams()
  const { download, isDownloading } = useDownload()
  const [hover, setHover] = useState(false)
  const { rive, RiveComponent } = useRive({
    src: ButtonRiv,
    artboard: RIVE_CONFIG.artboard,
    stateMachines: RIVE_CONFIG.stateMachine,
    autoplay: true,
    onStateChange: async (event) => {
      if (!event.data) return

      let state = event.data as string
      if (Array.isArray(event.data) && event.data.length > 0) {
        state = event.data.pop() as string
      }

      if (state === RIVE_CONFIG.states.download) {
        await handleDownload()
      }
    },
  })

  const stopDownloadAnimationTrigger = useStateMachineInput(
    rive,
    RIVE_CONFIG.stateMachine,
    RIVE_CONFIG.inputs.triggers.stop,
  )

  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, (riveEvent) => {
        const event = (riveEvent.data as RiveEventPayload)?.name as string
        setHover(event === 'Button Hovered')
      });
    }
  }, [rive]);

  useEffect(() => {
    if (!isDownloading && stopDownloadAnimationTrigger) {
      stopDownloadAnimationTrigger.fire()
    }
  }, [isDownloading, stopDownloadAnimationTrigger])

  // If the URL includes ?pdf=true, do not render the button.
  const isPdf = searchParams.get('pdf') === 'true'
  if (isPdf) return null

  const handleDownload = async () => {
    await download(url || window.location.href)
  }

  return (
    <div
      data-hide-print="true"
      className={clsx(styles.root, {
        [styles.isDownloading]: isDownloading,
        [styles.hover]: hover,
      })}
    >
      <RiveComponent />
    </div>
  )
}

export default DownloadPageAsPdfButton
