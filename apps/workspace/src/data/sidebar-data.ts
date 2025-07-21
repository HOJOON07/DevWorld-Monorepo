import {
  ArrowDown,
  ArrowUp,
  AudioWaveform,
  Bell,
  Blocks,
  Calendar,
  Command,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  Home,
  Inbox,
  LayoutList,
  LineChart,
  Link,
  type LucideIcon,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash,
  Trash2,
} from '@devworld/ui';

export interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: string;
}

export interface Favorite {
  name: string;
  url: string;
  emoji: string;
}

export interface WorkspacePage {
  name: string;
  url: string;
  emoji: string;
}

export interface Workspace {
  name: string;
  emoji: React.ReactNode;
  pages: WorkspacePage[];
}

export interface Action {
  label: string;
  icon: LucideIcon;
}

export interface SidebarData {
  teams: Team[];
  navMain: NavItem[];
  navSecondary: NavItem[];
  favorites: Favorite[];
  workspaces: Workspace[];
  actions: Action[][];
}

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'DevWorld',
      logo: Command,
      plan: 'Enterprise',
    },
    {
      name: 'Hojoon.Kim',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Personal',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Home',
      url: '/workspace',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      badge: '10',
    },
    {
      title: 'Tasks',
      url: '#',
      icon: LayoutList,
    },
    {
      title: 'Ask AI',
      url: '#',
      icon: Sparkles,
    },
  ],
  navSecondary: [
    {
      title: 'Calendar',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
    },
    {
      title: 'Templates',
      url: '#',
      icon: Blocks,
    },
    {
      title: 'Trash',
      url: '#',
      icon: Trash2,
    },
    {
      title: 'Help',
      url: '#',
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: 'Project Management & Task Tracking',
      url: '#',
      emoji: '📊',
    },
    {
      name: 'Family Recipe Collection & Meal Planning',
      url: '#',
      emoji: '🍳',
    },
    {
      name: 'Fitness Tracker & Workout Routines',
      url: '#',
      emoji: '💪',
    },
    {
      name: 'Book Notes & Reading List',
      url: '#',
      emoji: '📚',
    },
    {
      name: 'Sustainable Gardening Tips & Plant Care',
      url: '#',
      emoji: '🌱',
    },
    {
      name: 'Language Learning Progress & Resources',
      url: '#',
      emoji: '🗣️',
    },
    {
      name: 'Home Renovation Ideas & Budget Tracker',
      url: '#',
      emoji: '🏠',
    },
    {
      name: 'Personal Finance & Investment Portfolio',
      url: '#',
      emoji: '💰',
    },
    {
      name: 'Movie & TV Show Watchlist with Reviews',
      url: '#',
      emoji: '🎬',
    },
    {
      name: 'Daily Habit Tracker & Goal Setting',
      url: '#',
      emoji: '✅',
    },
  ],
  workspaces: [
    {
      name: 'Personal Life Management',
      emoji: '🏠',
      pages: [
        {
          name: 'Daily Journal & Reflection',
          url: '#',
          emoji: '📔',
        },
        {
          name: 'Health & Wellness Tracker',
          url: '#',
          emoji: '🍏',
        },
        {
          name: 'Personal Growth & Learning Goals',
          url: '#',
          emoji: '🌟',
        },
      ],
    },
    {
      name: 'Professional Development',
      emoji: '💼',
      pages: [
        {
          name: 'Career Objectives & Milestones',
          url: '#',
          emoji: '🎯',
        },
        {
          name: 'Skill Acquisition & Training Log',
          url: '#',
          emoji: '🧠',
        },
        {
          name: 'Networking Contacts & Events',
          url: '#',
          emoji: '🤝',
        },
      ],
    },
    {
      name: 'Creative Projects',
      emoji: '🎨',
      pages: [
        {
          name: 'Writing Ideas & Story Outlines',
          url: '#',
          emoji: '✍️',
        },
        {
          name: 'Art & Design Portfolio',
          url: '#',
          emoji: '🖼️',
        },
        {
          name: 'Music Composition & Practice Log',
          url: '#',
          emoji: '🎵',
        },
      ],
    },
    {
      name: 'Home Management',
      emoji: '🏡',
      pages: [
        {
          name: 'Household Budget & Expense Tracking',
          url: '#',
          emoji: '💰',
        },
        {
          name: 'Home Maintenance Schedule & Tasks',
          url: '#',
          emoji: '🔧',
        },
        {
          name: 'Family Calendar & Event Planning',
          url: '#',
          emoji: '📅',
        },
      ],
    },
    {
      name: 'Travel & Adventure',
      emoji: '🧳',
      pages: [
        {
          name: 'Trip Planning & Itineraries',
          url: '#',
          emoji: '🗺️',
        },
        {
          name: 'Travel Bucket List & Inspiration',
          url: '#',
          emoji: '🌎',
        },
        {
          name: 'Travel Journal & Photo Gallery',
          url: '#',
          emoji: '📸',
        },
      ],
    },
  ],
  actions: [
    [
      {
        label: 'Customize Page',
        icon: Settings2,
      },
      {
        label: 'Turn into wiki',
        icon: FileText,
      },
    ],
    [
      {
        label: 'Copy Link',
        icon: Link,
      },
      {
        label: 'Duplicate',
        icon: Copy,
      },
      {
        label: 'Move to',
        icon: CornerUpRight,
      },
      {
        label: 'Move to Trash',
        icon: Trash2,
      },
    ],
    [
      {
        label: 'Undo',
        icon: CornerUpLeft,
      },
      {
        label: 'View analytics',
        icon: LineChart,
      },
      {
        label: 'Version History',
        icon: GalleryVerticalEnd,
      },
      {
        label: 'Show delete pages',
        icon: Trash,
      },
      {
        label: 'Notifications',
        icon: Bell,
      },
    ],
    [
      {
        label: 'Import',
        icon: ArrowUp,
      },
      {
        label: 'Export',
        icon: ArrowDown,
      },
    ],
  ],
};
