import type { FC } from 'react'

import styles from './TimelineEntry.module.scss'

interface TimelineEntryProps {
  time?: {
    start: string | null
    end: string | null
  }
  place?: string
}

export const TimelineEntry: FC<TimelineEntryProps> = ({place, time}) => {
  const formatDate = (date: string | null | undefined) => {
    if (!date) return ''
    const dateObj = new Date(date)
    return `${dateObj.toLocaleString('default', { month: '2-digit' })}/${dateObj.getFullYear()}`
  }
  // calculate the time period and format it like so, handling the plural: n year and x months
  const calculateTimePeriod = (start: string | null, end: string | null) => {
    if (!start) return ''
    const startObj = new Date(start)
    const endObj = end ? new Date(end) : new Date()
    const years = endObj.getFullYear() - startObj.getFullYear()
    const months = endObj.getMonth() - startObj.getMonth()
    const yearsString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''
    const monthsString = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''
    const conjunction = years > 0 && months > 0 ? ' and ' : ' '
    return `${yearsString}${conjunction}${monthsString}`
  }

  return (
    <article className={styles.root}>
      {time && <p className={styles.time}>
        <span>{calculateTimePeriod(time.start, time.end)}</span>
        <span>
          ({time.start ? formatDate(time.start) : ''} - {time.end ? formatDate(time.end) : 'Present'})
        </span>
      </p>}
      {place && <p className={styles.place}> {place} </p>}
    </article>
  )
}
