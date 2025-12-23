import { Time } from "@/types/curriculum";

interface HasTime {
  time?: Time;
}

const getTimestamp = (dateStr: string | null | undefined, isEndFallback: boolean = false): number => {
  if (!dateStr || dateStr.trim() === "") {
    return isEndFallback ? Date.now() : 0;
  }

  if (dateStr.includes('/')) {
    const [month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, 1).getTime();
  }

  const parsed = new Date(dateStr).getTime();
  return isNaN(parsed) ? 0 : parsed;
};

export const sortTimelineItems = <T extends HasTime>(items: T[] = []): T[] => {
  if (!items || !Array.isArray(items)) return [];

  return [...items].sort((a, b) => {

    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;

    const dateA = getTimestamp(a.time.end, true);
    const dateB = getTimestamp(b.time.end, true);

    if (dateB === dateA) {
      const startA = getTimestamp(a.time.start);
      const startB = getTimestamp(b.time.start);
      return startB - startA;
    }

    return dateB - dateA;
  });
};