import {baseInstance, staticHeaders} from "@/network/axios";
import {useQueryClient, useQuery as useReactQuery} from "@tanstack/react-query";
// import {useEffect, useMemo, useState} from "react";

export const useQuery = (
  queryKey,
  endPoint,
  params = "",
  headers = {...staticHeaders()},
) => {
  const queryClient = useQueryClient();

  return useReactQuery({
    queryKey: [queryKey],
    networkMode: "always",
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

// export default function useOnScreen(ref) {
//   const [isIntersecting, setIntersecting] = useState(false);

//   const observer = useMemo(
//     () =>
//       new IntersectionObserver(([entry]) =>
//         setIntersecting(entry.isIntersecting),
//       ),
//     [ref],
//   );

//   useEffect(() => {
//     if (ref.current) {
//       observer.observe(ref.current);
//       return () => observer.disconnect();
//     }
//   }, [ref.current]);

//   return isIntersecting;
// }
