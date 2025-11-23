export interface NewsItem {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  image: string;
  author?: string;
  content?: string;
  date?: string;
}

export interface Program {
  id: string;
  title: string;
  category: string;
  time: string;
  image: string;
  isLive?: boolean;
}

export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  category: string;
  image: string;
  isCurrent?: boolean;
}

export interface VideoItem {
    id: string;
    title: string;
    duration: string;
    image: string;
    category: string;
    views?: string;
}