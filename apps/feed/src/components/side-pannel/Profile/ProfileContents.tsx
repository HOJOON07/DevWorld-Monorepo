import { Button, Form, LinkIcon, Mail, MapPin } from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProfileEditSchema, ProfileEditType } from '../../../lib/profile-edit-schema';
import ProfileAvatar from './Avatar';
import { FormInput, FormTextarea } from './FormInput';

export default function ProfileContents({ user }: { user: ProfileEditType }) {
  const form = useForm<ProfileEditType>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      devName: user?.devName,
      bio: user?.bio,
      position: user?.position,
      location: user?.location,
      github: user?.github,
      email: user?.email,
      linkedin: user?.linkedin,
      instagram: user?.instagram,
      socialEtc: user?.socialEtc,
      image: user?.image,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  console.log(form);

  const onSubmit = async (values: ProfileEditType) => {
    console.log('Profile form submitted:', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <ProfileAvatar
          control={form.control}
          name='image'
          currentImageUrl={user?.image}
          userName={user?.devName || 'User'}
        />

        <FormInput
          name='devName'
          label='Developer Name'
          placeholder='Enter your developer name'
          register={register}
          errors={errors}
        />

        <FormInput
          name='position'
          label='Position'
          placeholder='e.g. Frontend Developer'
          register={register}
          errors={errors}
        />

        <FormTextarea
          name='bio'
          label='Bio'
          placeholder='Tell us about yourself...'
          rows={3}
          register={register}
          errors={errors}
        />

        <FormInput
          name='location'
          label='Location'
          placeholder='Based in Seoul, Korea'
          icon={<MapPin />}
          register={register}
          errors={errors}
        />

        <FormInput
          name='email'
          label='Email'
          type='email'
          disabled={true}
          placeholder='your.email@example.com'
          icon={<Mail />}
          register={register}
          errors={errors}
        />

        <FormInput
          name='github'
          label='GitHub'
          placeholder='your-github-username'
          register={register}
          errors={errors}
        />

        <FormInput
          name='linkedin'
          label='LinkedIn'
          type='url'
          placeholder='https://linkedin.com/in/your-profile'
          icon={<LinkIcon />}
          register={register}
          errors={errors}
        />

        <FormInput
          name='instagram'
          label='Instagram'
          placeholder='your-instagram-handle'
          register={register}
          errors={errors}
        />

        <FormInput
          name='socialEtc'
          label='Other Social'
          type='url'
          placeholder='https://your-website.com'
          icon={<LinkIcon />}
          register={register}
          errors={errors}
        />

        <div className='pt-4'>
          <Button type='submit' className='w-full'>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
