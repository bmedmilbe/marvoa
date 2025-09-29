import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

export interface Balance {
  debit?: number;
  credit?: number;
}
interface QueryParams {}

const useRemain = (query_params: QueryParams, idGroup: number) => {
  const apiClient = new ApiClient<Balance>(
    "sharefund/groups/" + idGroup + "/balance"
  );
  return useQuery<Balance>({
    queryFn: () => {
      return apiClient.getAllSimple({
        params: {
          ...query_params,
        },
      });
    },
    queryKey: ["remain", query_params],
  });
};

export default useRemain;
