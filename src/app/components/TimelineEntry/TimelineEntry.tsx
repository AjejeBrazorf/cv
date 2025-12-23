import type { FC } from 'react';
import styles from './TimelineEntry.module.scss';
import { Time } from '@/types/curriculum';

interface TimelineEntryProps {
  time?: Time;
  place?: string;
}

export const TimelineEntry: FC<TimelineEntryProps> = ({ place, time }) => {
  
  const parseDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return null;
    if (dateStr.includes('/')) {
      const [month, year] = dateStr.split('/');
      // Note: Date constructor uses 0-indexed months
      return new Date(parseInt(year), parseInt(month) - 1, 1);
    }
    return new Date(dateStr);
  };

  const formatDate = (date: string | null | undefined) => {
    const dateObj = parseDate(date);
    if (!dateObj || isNaN(dateObj.getTime())) return '';
    
    return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
  };

  const calculateTimePeriod = (start: string | null, end: string | null) => {
    const startObj = parseDate(start);
    if (!startObj || isNaN(startObj.getTime())) return '';
    
    const endObj = parseDate(end) || new Date();

    let years = endObj.getFullYear() - startObj.getFullYear();
    let months = endObj.getMonth() - startObj.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    const yearsString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthsString = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
    const conjunction = years > 0 && months > 0 ? ' and ' : '';
    
    const result = `${yearsString}${conjunction}${monthsString}`;
    return result || 'Less than a month';
  };

  return (
    <article className={styles.root}>
      {time && (
        <p className={styles.time}>
          <span className={styles.duration}>{calculateTimePeriod(time.start, time.end)}</span>
          <span className={styles.dates}>
            ({time.start ? formatDate(time.start) : ''} - {time.end ? formatDate(time.end) : 'Present'})
          </span>
        </p>
      )}
      {place && <p className={styles.place}> {place} </p>}
    </article>
  );
};