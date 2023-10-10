import {
  useMutation as useReactMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {baseInstance, staticHeaders} from "@/network/axios";

export const useMutation = (
  mutationKey,
  method,
  url,
  data,
  headers = {...staticHeaders()},
) => {
  const queryClient = useQueryClient();

  return useReactMutation({
    mutationKey: [mutationKey],
    mutationFn: async payload => {
      return baseInstance({
        method,
        url,
        data: payload ?? data,
        headers,
      }).then(res => {
        queryClient.invalidateQueries([mutationKey]);
        return res.data;
      });
    },
  });
};
