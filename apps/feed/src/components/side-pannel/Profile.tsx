import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Camera,
  Input,
  Label,
  LinkIcon,
  Mail,
  MapPin,
  Separator,
  Switch,
  Textarea,
} from '@devworld/ui';
import { useState } from 'react';

export default function Profile() {
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
}