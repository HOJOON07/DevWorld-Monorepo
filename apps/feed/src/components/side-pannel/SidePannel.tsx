import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Bell,
  Button,
  Calendar,
  Camera,
  ChevronRight,
  Clock,
  Heart,
  Input,
  Label,
  LinkIcon,
  Mail,
  MapPin,
  MessageSquare,
  ScrollArea,
  Separator,
  Settings,
  Star,
  Switch,
  Textarea,
  TrendingUp,
  UserPlus,
  Users,
} from '@devworld/ui';
import { useState } from 'react';
import { notifications, sampleArticle, workspaceItems } from '../../mock/mock-data';
import SidePannelHeader from './Header';

type SidebarMode = 'preview' | 'workspace' | 'notifications' | 'profile';

// 샘플 데이터들

export default function SidePannel() {
  const [activeMode, setActiveMode] = useState<SidebarMode>('preview');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    bio: 'Full-stack developer passionate about creating amazing user experiences',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    email: 'john@example.com',
    notifications: {
      email: true,
      push: false,
      mentions: true,
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className='h-4 w-4 text-red-500' />;
      case 'comment':
        return <MessageSquare className='h-4 w-4 text-blue-500' />;
      case 'follow':
        return <UserPlus className='h-4 w-4 text-green-500' />;
      case 'mention':
        return <Bell className='h-4 w-4 text-purple-500' />;
      default:
        return <Bell className='h-4 w-4 text-gray-500' />;
    }
  };

  const renderModeContent = () => {
    switch (activeMode) {
      case 'preview':
        return (
          <div className='space-y-6'>
            {/* Featured Image */}
            <div className='relative overflow-hidden rounded-xl'>
              <img
                src={sampleArticle.image || '/placeholder.svg'}
                alt={sampleArticle.title}
                className='h-48 w-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
              <div className='absolute right-3 bottom-3 left-3'>
                <div className='flex items-center justify-between'>
                  <Badge className='bg-white/90 font-medium text-gray-800'>
                    {sampleArticle.difficulty}
                  </Badge>
                  <div className='flex items-center space-x-1 text-sm text-white'>
                    <Clock className='h-3 w-3' />
                    <span>{sampleArticle.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className='flex items-center space-x-3 rounded-xl bg-gray-50 p-4'>
              <Avatar className='h-12 w-12 ring-2 ring-white'>
                <AvatarImage
                  src={sampleArticle.author.avatar || '/placeholder.svg'}
                  alt={sampleArticle.author.name}
                />
                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
                  {sampleArticle.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <div className='flex items-center space-x-1'>
                  <h4 className='font-semibold text-gray-900'>{sampleArticle.author.name}</h4>
                  {sampleArticle.author.verified && (
                    <Star className='h-4 w-4 fill-current text-blue-500' />
                  )}
                </div>
                <p className='text-gray-600 text-sm'>{sampleArticle.author.role}</p>
                <p className='text-gray-500 text-xs'>{sampleArticle.author.company}</p>
                <div className='mt-1 flex items-center space-x-1'>
                  <Users className='h-3 w-3 text-gray-400' />
                  <span className='text-gray-500 text-xs'>
                    {formatNumber(sampleArticle.author.followers)} followers
                  </span>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between text-gray-600 text-sm'>
                <div className='flex items-center space-x-1'>
                  <Calendar className='h-4 w-4' />
                  <span>Published {formatDate(sampleArticle.publishedAt)}</span>
                </div>
                <div className='flex items-center space-x-1'>
                  <TrendingUp className='h-4 w-4 text-green-600' />
                  <span className='font-medium text-green-600'>Trending</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className='space-y-2'>
              <h5 className='font-medium text-gray-900 text-sm'>Topics</h5>
              <div className='flex flex-wrap gap-2'>
                {sampleArticle.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='cursor-pointer text-xs hover:bg-gray-100'
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Excerpt */}
            <div className='space-y-2'>
              <h5 className='font-medium text-gray-900 text-sm'>Preview</h5>
              <p className='text-gray-600 text-sm leading-relaxed'>{sampleArticle.excerpt}</p>
            </div>

            {/* Content Preview */}
            <div className='space-y-2'>
              <h5 className='font-medium text-gray-900 text-sm'>Content Outline</h5>
              <div
                className='prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed'
                dangerouslySetInnerHTML={{ __html: sampleArticle.content }}
              />
            </div>

            <Separator />

            {/* Related Articles */}
            <div className='space-y-3'>
              <h5 className='font-medium text-gray-900 text-sm'>Related Articles</h5>
              <div className='space-y-2'>
                {sampleArticle.relatedArticles.map((article, index) => (
                  <div
                    key={index}
                    className='flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                  >
                    <div className='flex-1'>
                      <p className='font-medium text-gray-900 text-sm'>{article.title}</p>
                      <p className='text-gray-500 text-xs'>{article.readTime}</p>
                    </div>
                    <ChevronRight className='h-4 w-4 text-gray-400' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'workspace':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-900 text-lg'>My Workspace</h3>
              <Button size='sm' variant='outline'>
                <Settings className='mr-1 h-4 w-4' />
                Settings
              </Button>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 gap-3'>
              <div className='rounded-lg bg-blue-50 p-3'>
                <div className='font-bold text-2xl text-blue-600'>12</div>
                <div className='text-blue-600 text-xs'>Active Projects</div>
              </div>
              <div className='rounded-lg bg-green-50 p-3'>
                <div className='font-bold text-2xl text-green-600'>8</div>
                <div className='text-green-600 text-xs'>Completed</div>
              </div>
            </div>

            {/* Recent Items */}
            <div className='space-y-3'>
              <h4 className='font-medium text-gray-900 text-sm'>Recent Items</h4>
              <div className='space-y-2'>
                {workspaceItems.map((item) => (
                  <div
                    key={item.id}
                    className='cursor-pointer rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100'
                  >
                    <div className='mb-2 flex items-start justify-between'>
                      <h5 className='font-medium text-gray-900 text-sm'>{item.title}</h5>
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className='flex items-center justify-between text-gray-500 text-xs'>
                      <span>{item.type}</span>
                      <span>{item.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button className='w-full'>Create New Project</Button>
          </div>
        );

      case 'notifications':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-900 text-lg'>Notifications</h3>
              <Button size='sm' variant='ghost'>
                Mark all read
              </Button>
            </div>

            <div className='space-y-2'>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    notification.read ? 'border-gray-100 bg-white' : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className='flex items-start space-x-3'>
                    <div className='mt-0.5'>{getNotificationIcon(notification.type)}</div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-gray-900 text-sm'>{notification.message}</p>
                      {notification.article && (
                        <p className='mt-1 text-gray-500 text-xs'>"{notification.article}"</p>
                      )}
                      <p className='mt-1 text-gray-400 text-xs'>{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className='mt-2 h-2 w-2 rounded-full bg-blue-500'></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='font-semibold text-gray-900 text-lg'>Profile Settings</h3>
              <Button size='sm' variant='outline'>
                Save Changes
              </Button>
            </div>

            {/* Profile Picture */}
            <div className='flex items-center space-x-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src='/placeholder.svg?height=64&width=64' alt='Profile' />
                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-lg text-white'>
                  {profileData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button size='sm' variant='outline'>
                  <Camera className='mr-1 h-4 w-4' />
                  Change Photo
                </Button>
                <p className='mt-1 text-gray-500 text-xs'>JPG, PNG up to 2MB</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className='space-y-4'>
              <div>
                <Label htmlFor='name' className='font-medium text-sm'>
                  Full Name
                </Label>
                <Input
                  id='name'
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className='mt-1'
                />
              </div>

              <div>
                <Label htmlFor='bio' className='font-medium text-sm'>
                  Bio
                </Label>
                <Textarea
                  id='bio'
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className='mt-1'
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor='location' className='font-medium text-sm'>
                  Location
                </Label>
                <div className='relative mt-1'>
                  <MapPin className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='location'
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className='pl-10'
                  />
                </div>
              </div>

              <div>
                <Label htmlFor='website' className='font-medium text-sm'>
                  Website
                </Label>
                <div className='relative mt-1'>
                  <LinkIcon className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='website'
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    className='pl-10'
                  />
                </div>
              </div>

              <div>
                <Label htmlFor='email' className='font-medium text-sm'>
                  Email
                </Label>
                <div className='relative mt-1'>
                  <Mail className='absolute top-3 left-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className='pl-10'
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Settings */}
            <div className='space-y-4'>
              <h4 className='font-medium text-gray-900 text-sm'>Notification Preferences</h4>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-900 text-sm'>Email notifications</p>
                    <p className='text-gray-500 text-xs'>Receive updates via email</p>
                  </div>
                  <Switch
                    checked={profileData.notifications.email}
                    onCheckedChange={(checked) =>
                      setProfileData({
                        ...profileData,
                        notifications: { ...profileData.notifications, email: checked },
                      })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-900 text-sm'>Push notifications</p>
                    <p className='text-gray-500 text-xs'>Receive push notifications</p>
                  </div>
                  <Switch
                    checked={profileData.notifications.push}
                    onCheckedChange={(checked) =>
                      setProfileData({
                        ...profileData,
                        notifications: { ...profileData.notifications, push: checked },
                      })
                    }
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-900 text-sm'>Mentions</p>
                    <p className='text-gray-500 text-xs'>When someone mentions you</p>
                  </div>
                  <Switch
                    checked={profileData.notifications.mentions}
                    onCheckedChange={(checked) =>
                      setProfileData({
                        ...profileData,
                        notifications: { ...profileData.notifications, mentions: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='flex h-screen w-full max-w-md flex-col border-gray-200 border-l bg-white '>
      {/* Header with Mode Tabs */}
      <SidePannelHeader activeMode={activeMode} setActiveMode={setActiveMode} />

      {/* Content */}
      <ScrollArea className='flex-1'>
        <div className='p-6'>{renderModeContent()}</div>
      </ScrollArea>
    </div>
  );
}
