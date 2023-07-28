import {baseInstance, staticHeaders} from "@/network/axios";
import {useQueryClient, useQuery as useReactQuery} from "@tanstack/react-query";

export const useQuery = (
  queryKey,
  endPoint,
  params = "",
  headers = {...staticHeaders()},
) => {
  const queryClient = useQueryClient();

  return useReactQuery({
    queryKey: [queryKey],
    // [queryKey,_]: queryKey,
    queryFn: async () => {
      return baseInstance.get(`/${endPoint}${params}`, {headers}).then(res => {
        queryClient.invalidateQueries([queryKey]);
        return res?.data;
      });
    },
    enabled: false,
    onError: e => e,
  });
};
