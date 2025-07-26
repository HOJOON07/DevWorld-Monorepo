import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Camera,
  FormField,
  FormItem,
} from '@devworld/ui';
import { useRef, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { useAvatarPreview } from '../../../hooks/use-avatar-preview';

interface ProfileAvatarProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  currentImageUrl?: string | null;
  userName?: string;
}

export default function ProfileAvatar<T extends FieldValues>({
  control,
  name,
  currentImageUrl,
  userName = 'User',
}: ProfileAvatarProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleFileChange } = useAvatarPreview();
  const [isUploading, setIsUploading] = useState(false);

  const displayUrl = previewUrl || currentImageUrl;
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFileChange(files);
  };

  const handleUpload = async () => {
    if (!previewUrl) return;

    setIsUploading(true);
    try {
      // TODO: 실제 업로드 로직 구현
      // const presignedUrl = await uploadToS3(file);
      // form.setValue(name, presignedUrl);
      console.log('Uploading to S3/UploadThing...');

      // 임시로 2초 후 완료
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex items-center gap-3'>
            <div className='relative'>
              <Avatar
                className='h-16 w-16 cursor-pointer shadow-md ring-2 ring-white transition-opacity hover:opacity-80'
                onClick={handleAvatarClick}
              >
                <AvatarImage src={displayUrl as string} alt='Profile' />
                <AvatarFallback className='bg-gradient-to-r from-blue-500 to-purple-500 text-lg text-white'>
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              {previewUrl && (
                <div className='-top-1 -right-1 absolute h-4 w-4 rounded-full border-2 border-white bg-orange-500' />
              )}

              {/* 아바타 클릭 힌트 오버레이 */}
              <div
                className='absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-secondary-foreground bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'
                onClick={handleAvatarClick}
              >
                <Camera className='h-4 w-4 text-white' />
              </div>
            </div>
            <div>
              <p className='font-medium text-primary'>{userName}</p>
              <p className='text-gray-500 text-xs'>
                {previewUrl ? 'Ready to upload' : 'Click avatar to change'}
              </p>
            </div>
          </FormItem>
        )}
      />

      <div className='flex flex-col gap-2'>
        <Button
          size='sm'
          variant='default'
          onClick={handleUpload}
          disabled={!previewUrl || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
        {previewUrl && (
          <Button
            size='sm'
            variant='outline'
            onClick={() => handleFileChange(null)}
            disabled={isUploading}
          >
            Cancel
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileInputChange}
      />
    </div>
  );
}
