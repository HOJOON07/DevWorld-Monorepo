import { useEditorRef } from '@devworld/editor';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from '@devworld/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateDocs } from '../../app/api/query-hooks/use-create-docs';
import { PublishSchema, PublishType } from '../../lib/publish-form-schema';
import Thumbnails from './Thumbnails';

export default function PublishDialog({ children }: { children: React.ReactNode }) {
  const editor = useEditorRef();
  const createDocsMutaion = useCreateDocs();
  const form = useForm<PublishType>({
    resolver: zodResolver(PublishSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnails: '',
      isPrivate: 'private',
    },
  });

  const onSubmit = (values: PublishType) => {
    const publishData = {
      ...values,
      contents: editor.children,
    };
    createDocsMutaion.mutate(publishData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='sm:text-center'>Publish or Save your article.</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='grid gap-3 text-primary'>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} id='title' required />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid gap-3'>
                    <div className='flex items-center text-primary'>
                      <FormLabel>Description</FormLabel>
                    </div>
                    <Input {...field} id='description' required />
                    <FormMessage />
                    <FormDescription />
                  </FormItem>
                )}
              />

              <Thumbnails control={form.control} name='thumbnails' />

              <FormField
                control={form.control}
                name='isPrivate'
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <FormLabel>Disclosure</FormLabel>
                      <FormDescription className='text-xs'>
                        {field.value === 'open'
                          ? 'Public - Anyone can view'
                          : 'Private - Only you can view'}
                      </FormDescription>
                    </div>
                    <Switch
                      checked={field.value === 'open'}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? 'open' : 'private');
                      }}
                    />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
