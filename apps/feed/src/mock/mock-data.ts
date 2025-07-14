export const sampleArticle = {
  id: 1,
  title: 'The Future of Web Development: Trends to Watch in 2024',
  subtitle:
    'Exploring cutting-edge technologies that will shape the next generation of web applications',
  excerpt:
    'Dive deep into the revolutionary trends transforming web development, from AI-powered coding assistants to the rise of edge computing and serverless architectures.',
  content: `
    <h2>🚀 Introduction</h2>
    <p>The web development landscape is experiencing unprecedented transformation. As we navigate through 2024, emerging technologies are reshaping how we build, deploy, and interact with web applications.</p>
    
    <h2>🤖 AI-Powered Development</h2>
    <p>Artificial Intelligence is no longer a futuristic concept—it's actively revolutionizing development workflows. From intelligent code completion to automated testing and bug detection, AI tools are becoming essential companions for modern developers.</p>
    
    <h2>⚡ Edge Computing Revolution</h2>
    <p>Edge computing is bringing computation closer to users, dramatically reducing latency and improving user experiences. This shift is particularly impactful for real-time applications and IoT integrations.</p>
  `,
  author: {
    name: 'Sarah Chen',
    avatar: '/placeholder.svg?height=40&width=40',
    role: 'Senior Frontend Architect',
    company: 'TechFlow Inc.',
    followers: 12500,
    verified: true,
  },
  publishedAt: '2024-01-15T10:30:00Z',
  readTime: '8 min read',
  tags: ['Web Development', 'AI', 'Edge Computing', 'PWA', 'Serverless'],
  category: 'Technology',
  difficulty: 'Intermediate',
  image: '/placeholder.svg?height=300&width=600',
  relatedArticles: [
    { title: 'Building Scalable React Applications', readTime: '12 min' },
    { title: 'CSS Grid vs Flexbox Guide', readTime: '6 min' },
    { title: 'Next.js Performance Optimization', readTime: '10 min' },
  ],
};

export const workspaceItems = [
  {
    id: 1,
    title: 'React Component Library',
    type: 'Project',
    status: 'In Progress',
    updated: '2 hours ago',
  },
  { id: 2, title: 'API Documentation', type: 'Document', status: 'Review', updated: '1 day ago' },
  {
    id: 3,
    title: 'Design System Updates',
    type: 'Design',
    status: 'Completed',
    updated: '3 days ago',
  },
  { id: 4, title: 'Performance Optimization', type: 'Task', status: 'Todo', updated: '1 week ago' },
];

export const notifications = [
  {
    id: 1,
    type: 'like',
    message: 'Alex Rodriguez liked your article',
    article: 'Building Scalable React Applications',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    message: 'Emma Thompson commented on your post',
    article: 'CSS Grid vs Flexbox Guide',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    message: 'David Kim started following you',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'mention',
    message: 'You were mentioned in a discussion',
    article: 'Modern Authentication Patterns',
    time: '1 day ago',
    read: true,
  },
];
