import { cn, FormItem, FormLabel, Input, Textarea } from '@devworld/ui';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { ProfileEditType } from '../../../lib/profile-edit-schema';
import ProfileIcon, { IconList } from './Icon';

interface BaseFormInputProps {
  name: Path<ProfileEditType>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<ProfileEditType>;
  errors: FieldErrors<ProfileEditType>;
}

interface FormInputProps extends BaseFormInputProps {
  type?: 'text' | 'email' | 'url';
  icon?: React.ReactNode;
}

interface FormTextareaProps extends BaseFormInputProps {
  rows?: number;
}

export function FormInput({
  name,
  label,
  placeholder,
  type = 'text',
  register,
  errors,
  disabled = false,
}: FormInputProps) {
  const fieldError = errors[name];
  const hasIcon = ['location', 'email', 'linkedin', 'socialEtc'].includes(name);

  return (
    <FormItem>
      <FormLabel className='font-medium text-primary text-sm'>{label}</FormLabel>
      <div className='relative'>
        {hasIcon && (
          <ProfileIcon
            name={name as IconList}
            className='-translate-y-1/2 absolute top-1/2 left-3 h-3 w-3 transform text-muted-foreground'
          />
        )}
        <Input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={cn(hasIcon && 'pl-8')}
          disabled={disabled}
        />
      </div>
      {fieldError && <p className='text-red-500 text-xs'>{fieldError.message}</p>}
    </FormItem>
  );
}

export function FormTextarea({
  name,
  label,
  placeholder,
  rows = 3,
  disabled = false,
  register,
  errors,
}: FormTextareaProps) {
  const fieldError = errors[name];

  return (
    <FormItem>
      <FormLabel className='font-medium text-sm'>{label}</FormLabel>
      <Textarea {...register(name)} placeholder={placeholder} disabled={disabled} rows={rows} />
      {fieldError && <p className='text-red-500 text-xs'>{fieldError.message}</p>}
    </FormItem>
  );
}
