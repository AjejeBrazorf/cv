import { TimeRange } from "@/types/curriculum";

interface HasTime {
  time?: TimeRange;
}

export const sortTimelineItems = <T extends HasTime>(items: T[] = []): T[] => {
  return [...items].sort((a, b) => {
    if (!a.time) return 1;
    if (!b.time) return -1;

    const dateA = new Date(a.time.end || a.time.start || 0).getTime();
    const dateB = new Date(b.time.end || b.time.start || 0).getTime();

    return dateB - dateA;
  });
};