import { useQuery, useQueryClient } from '@devworld/tanstack-query-client';
import { getMyInfo } from '../api/get-my-info';

export default function createGlobalMyInfoState<T>(
  queryKey: unknown,
  initialData: T | undefined = undefined,
  defaultEnabled: boolean,
) {
  return function (enabled: boolean = defaultEnabled) {
    const queryClient = useQueryClient();

    const { data, isError, isLoading, isSuccess } = useQuery({
      queryKey: [queryKey],
      queryFn: getMyInfo,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      retry: 3,
      enabled,
      staleTime: 1000 * 60 * 15,
    });

    function setData(data: Partial<T>) {
      queryClient.setQueryData([queryKey], data);
    }

    function resetData() {
      queryClient.refetchQueries({
        queryKey: [queryKey],
      });
      // queryClient.removeQueries({ queryKey: [queryKey], exact: true });
      // queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
    return { data, setData, resetData, isLoading, isError, isSuccess };
  };
}
