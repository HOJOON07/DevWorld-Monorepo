import { FileText, FormField, FormItem, FormLabel, FormMessage } from '@devworld/ui';
import { Control, FieldValues, Path } from 'react-hook-form';

interface ImageUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export default function Thumbnails<T extends FieldValues>({ control, name }: ImageUploadProps<T>) {
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          onChange(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <div className='flex w-full justify-between'>
            <FormLabel className='mb-5 text-primary'>미리보기</FormLabel>
          </div>
          <div className='flex w-full items-center justify-center'>
            <label
              htmlFor='dropzone-file'
              className='relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-solid hover:bg-muted'
            >
              {field.value ? (
                <img
                  src={field.value}
                  alt='썸네일 미리보기'
                  className='h-full w-full rounded-md object-contain'
                />
              ) : (
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <FileText className='text-muted-foreground' />
                </div>
              )}
              <input
                id='dropzone-file'
                type='file'
                accept='image/*'
                className='hidden border-none outline-none'
                onChange={(e) => handleImageChange(e, field.onChange)}
              />
            </label>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
