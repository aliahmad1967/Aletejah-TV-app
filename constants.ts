
import { NewsItem, Program, ScheduleItem, VideoItem } from './types';

// ENGLISH DATA
export const NEWS_ITEMS_EN: NewsItem[] = [
  {
    id: '1',
    title: 'Global Summit Reaches Landmark Agreement',
    category: 'Politics',
    timeAgo: '2 hours ago',
    image: 'https://picsum.photos/id/20/400/300',
    author: 'Sarah Jenkins',
    date: 'Oct 26, 2023',
    content: 'Exclusive Interview with Prime Minister on National Reforms. He considerable contents are premiere to-rt opport with the rorisuite that is to addi tionue active chanduterities, and his fovelopment ofico and povlacion.'
  },
  {
    id: '2',
    title: 'Tech Giants Unveil New AI Initiatives',
    category: 'Technology',
    timeAgo: '4 hours ago',
    image: 'https://picsum.photos/id/4/400/300'
  },
  {
    id: '3',
    title: 'Local Sports Team Wins Championship',
    category: 'Sports',
    timeAgo: '5 hours ago',
    image: 'https://picsum.photos/id/76/400/300'
  },
  {
    id: '4',
    title: 'Economic Forum Discusses Future Trends',
    category: 'Economy',
    timeAgo: '1 day ago',
    image: 'https://picsum.photos/id/201/400/300'
  }
];

export const PROGRAMS_EN: Program[] = [
  {
    id: 'p1',
    title: 'The Evening Report',
    category: 'News',
    time: '8:00 PM',
    image: 'https://picsum.photos/id/338/300/400',
    isLive: true
  },
  {
    id: 'p2',
    title: 'Ancient Civilizations',
    category: 'Documentary',
    time: '9:30 PM',
    image: 'https://picsum.photos/id/1040/300/400'
  },
  {
    id: 'p3',
    title: 'Aletejah Talks',
    category: 'Entertainment',
    time: '10:00 PM',
    image: 'https://picsum.photos/id/64/300/400'
  },
  {
    id: 'p4',
    title: 'Weekend Sports Wrap',
    category: 'Sports',
    time: '11:30 PM',
    image: 'https://picsum.photos/id/452/300/400'
  }
];

export const SCHEDULE_ITEMS_EN: ScheduleItem[] = [
  {
    id: 's1',
    title: 'World News Hour',
    startTime: '18:00',
    endTime: '19:00',
    category: 'News',
    image: 'https://picsum.photos/id/381/100/100',
    isCurrent: true,
    description: 'Live coverage from the international summit.'
  },
  {
    id: 's2',
    title: 'The Evening Report',
    startTime: '19:00',
    endTime: '19:30',
    category: 'News',
    image: 'https://picsum.photos/id/106/100/100',
    description: 'Daily news summary.'
  },
  {
    id: 's3',
    title: 'History\'s Mysteries',
    startTime: '20:00',
    endTime: '21:00',
    category: 'Documentary',
    image: 'https://picsum.photos/id/204/100/100',
    description: 'Uncovering lost artifacts.'
  },
  {
    id: 's4',
    title: 'Tech Frontiers',
    startTime: '21:00',
    endTime: '22:00',
    category: 'Technology',
    image: 'https://picsum.photos/id/180/100/100',
    description: 'The latest in silicon valley.'
  }
];

export const VIDEO_LIBRARY_EN: { category: string; videos: VideoItem[] }[] = [
    {
        category: 'Episodes',
        videos: [
            { id: 'v1', title: 'World News Hour - Ep 5', duration: '12:56', image: 'https://picsum.photos/id/237/300/200', category: 'News' },
            { id: 'v2', title: 'The Evening Report - Ep 12', duration: '00:38', image: 'https://picsum.photos/id/238/300/200', category: 'News' },
        ]
    },
    {
        category: 'Interviews',
        videos: [
            { id: 'v3', title: 'Prime Minister Interview', duration: '01:22', image: 'https://picsum.photos/id/239/300/200', category: 'Politics' },
            { id: 'v4', title: 'The Views Report - Ep 8', duration: '00:32', image: 'https://picsum.photos/id/240/300/200', category: 'Politics' },
        ]
    },
    {
        category: 'Reports',
        videos: [
             { id: 'v5', title: 'Warzone Report - Live', duration: '01:16', image: 'https://picsum.photos/id/241/300/200', category: 'Conflict' },
             { id: 'v6', title: 'Economic Crisis Analysis', duration: '00:39', image: 'https://picsum.photos/id/242/300/200', category: 'Economy' },
        ]
    }
];

// ARABIC DATA
export const NEWS_ITEMS_AR: NewsItem[] = [
  {
    id: '1',
    title: 'القمة العالمية تتوصل إلى اتفاق تاريخي',
    category: 'سياسة',
    timeAgo: 'منذ ساعتين',
    image: 'https://picsum.photos/id/20/400/300',
    author: 'سارة جنكينز',
    date: '26 أكتوبر 2023',
    content: 'مقابلة حصرية مع رئيس الوزراء حول الإصلاحات الوطنية. تتضمن المحتويات الكبيرة فرصاً أولية مع المجموعة التي تهدف إلى إضافة أنشطة مستمرة، وتطوير مكاتبها وسكانها.'
  },
  {
    id: '2',
    title: 'عمالقة التكنولوجيا يكشفون عن مبادرات جديدة للذكاء الاصطناعي',
    category: 'تكنولوجيا',
    timeAgo: 'منذ 4 ساعات',
    image: 'https://picsum.photos/id/4/400/300'
  },
  {
    id: '3',
    title: 'الفريق الرياضي المحلي يفوز بالبطولة',
    category: 'رياضة',
    timeAgo: 'منذ 5 ساعات',
    image: 'https://picsum.photos/id/76/400/300'
  },
  {
    id: '4',
    title: 'المنتدى الاقتصادي يناقش الاتجاهات المستقبلية',
    category: 'اقتصاد',
    timeAgo: 'منذ يوم واحد',
    image: 'https://picsum.photos/id/201/400/300'
  }
];

export const PROGRAMS_AR: Program[] = [
  {
    id: 'p1',
    title: 'التقرير المسائي',
    category: 'أخبار',
    time: '8:00 م',
    image: 'https://picsum.photos/id/338/300/400',
    isLive: true
  },
  {
    id: 'p2',
    title: 'حضارات قديمة',
    category: 'وثائقي',
    time: '9:30 م',
    image: 'https://picsum.photos/id/1040/300/400'
  },
  {
    id: 'p3',
    title: 'حديث الاتجاه',
    category: 'ترفيه',
    time: '10:00 م',
    image: 'https://picsum.photos/id/64/300/400'
  },
  {
    id: 'p4',
    title: 'ملخص الرياضة الأسبوعي',
    category: 'رياضة',
    time: '11:30 م',
    image: 'https://picsum.photos/id/452/300/400'
  }
];

export const SCHEDULE_ITEMS_AR: ScheduleItem[] = [
  {
    id: 's1',
    title: 'ساعة الأخبار العالمية',
    startTime: '18:00',
    endTime: '19:00',
    category: 'أخبار',
    image: 'https://picsum.photos/id/381/100/100',
    isCurrent: true,
    description: 'تغطية حية من القمة الدولية.'
  },
  {
    id: 's2',
    title: 'التقرير المسائي',
    startTime: '19:00',
    endTime: '19:30',
    category: 'أخبار',
    image: 'https://picsum.photos/id/106/100/100',
    description: 'ملخص الأخبار اليومي.'
  },
  {
    id: 's3',
    title: 'ألغاز التاريخ',
    startTime: '20:00',
    endTime: '21:00',
    category: 'وثائقي',
    image: 'https://picsum.photos/id/204/100/100',
    description: 'كشف القطع الأثرية المفقودة.'
  },
  {
    id: 's4',
    title: 'حدود التكنولوجيا',
    startTime: '21:00',
    endTime: '22:00',
    category: 'تكنولوجيا',
    image: 'https://picsum.photos/id/180/100/100',
    description: 'أحدث ما في وادي السيليكون.'
  }
];

export const VIDEO_LIBRARY_AR: { category: string; videos: VideoItem[] }[] = [
    {
        category: 'حلقات',
        videos: [
            { id: 'v1', title: 'ساعة الأخبار العالمية - حلقة 5', duration: '12:56', image: 'https://picsum.photos/id/237/300/200', category: 'أخبار' },
            { id: 'v2', title: 'التقرير المسائي - حلقة 12', duration: '00:38', image: 'https://picsum.photos/id/238/300/200', category: 'أخبار' },
        ]
    },
    {
        category: 'مقابلات',
        videos: [
            { id: 'v3', title: 'مقابلة رئيس الوزراء', duration: '01:22', image: 'https://picsum.photos/id/239/300/200', category: 'سياسة' },
            { id: 'v4', title: 'تقرير الآراء - حلقة 8', duration: '00:32', image: 'https://picsum.photos/id/240/300/200', category: 'سياسة' },
        ]
    },
    {
        category: 'تقارير',
        videos: [
             { id: 'v5', title: 'تقرير منطقة الحرب - مباشر', duration: '01:16', image: 'https://picsum.photos/id/241/300/200', category: 'نزاع' },
             { id: 'v6', title: 'تحليل الأزمة الاقتصادية', duration: '00:39', image: 'https://picsum.photos/id/242/300/200', category: 'اقتصاد' },
        ]
    }
];

// Default exports for compatibility, though we should prefer using the named exports + context
export const NEWS_ITEMS = NEWS_ITEMS_EN;
export const PROGRAMS = PROGRAMS_EN;
export const SCHEDULE_ITEMS = SCHEDULE_ITEMS_EN;
export const VIDEO_LIBRARY = VIDEO_LIBRARY_EN;
