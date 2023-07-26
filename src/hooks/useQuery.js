import {baseInstance, staticHeaders} from "@/network/axios";
import {useQueryClient, useQuery as useReactQuery} from "@tanstack/react-query";

export const useQuery = (
  queryKey,
  endPoint,
  headers = {...staticHeaders()},
) => {
  const queryClient = useQueryClient();

  return useReactQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return baseInstance.get(endPoint, {headers}).then(res => {
        queryClient.invalidateQueries([queryKey]);
        return res?.data;
      });
    },
    enabled: false,
    onError: e => e,
  });
};
