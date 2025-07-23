import { useMutation } from '@devworld/tanstack-query-client';
import { useToast } from '@devworld/ui';
import { useNavigate } from 'react-router-dom';
import { CreateDocsRequest, createDocs } from '../create-docs';

export const useCreateDocs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: CreateDocsRequest) => {
      return await createDocs(formData);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Publish or Save Your Article',
        description: 'Success!',
      });
      navigate('docs');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Failed to Publish or Save',
        description: 'An error occurred while processing your request. Please try again.',
      });
    },
  });
};
