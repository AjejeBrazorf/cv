import type { FC } from 'react';
import styles from './TimelineEntry.module.scss';
import { Time } from '@/types/curriculum';

interface TimelineEntryProps {
  time?: Time;
  place?: string;
}

export const TimelineEntry: FC<TimelineEntryProps> = ({ place, time }) => {
  
  const parseDate = (dateStr: string | null | undefined) => {
    // Treat null, undefined, or empty strings as invalid for parsing
    if (!dateStr || dateStr.trim() === "") return null;
    
    if (dateStr.includes('/')) {
      const [month, year] = dateStr.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, 1);
    }
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (date: string | null | undefined) => {
    const dateObj = parseDate(date);
    if (!dateObj) return '';
    return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
  };

  const calculateTimePeriod = (start: string | null | undefined, end: string | null | undefined) => {
    const startObj = parseDate(start);
    if (!startObj) return '';
    
    const endObj = parseDate(end) || new Date();

    let years = endObj.getFullYear() - startObj.getFullYear();
    let months = endObj.getMonth() - startObj.getMonth() + 1; // +1 to include the partial month

    if (months < 0) {
      years--;
      months += 12;
    } else if (months >= 12) {
      years++;
      months -= 12;
    }

    const yearsString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthsString = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
    const conjunction = years > 0 && months > 0 ? ' and ' : '';
    
    const result = `${yearsString}${conjunction}${monthsString}`;
    return result || '1 month'; // Minimal duration
  };

  return (
    <article className={styles.root}>
      {time && (
        <p className={styles.time}>
          {/* We pass time.start and time.end directly; helper handles the Present logic */}
          <span className={styles.duration}>{calculateTimePeriod(time.start, time.end)}</span>
          <span className={styles.dates}>
            ({time.start ? formatDate(time.start) : ''} - {parseDate(time.end) ? formatDate(time.end) : 'Present'})
          </span>
        </p>
      )}
      {place && <p className={styles.place}> {place} </p>}
    </article>
  );
};