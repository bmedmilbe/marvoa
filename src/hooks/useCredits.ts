import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";
import type { Transaction } from "./useTransactions";

interface QueryParams {
  boss?: number;
  is_charge?: boolean;
  deliver?: number;
  completed?: boolean;
  completed_by?: number;
  friend?: number;
  friend_paid?: boolean;
  search?: string;
}

const useCredits = (query_params: QueryParams, idGroup: number) => {
  const apiClient = new ApiClient<Transaction>(
    "sharefund/groups/" + idGroup + "/credits"
  );
  return useInfiniteQuery<ResponseA<Transaction>>({
    queryFn: ({ pageParam = 0 }) => {
      // console.log(pageParam);
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 10,
          offset: pageParam * 10,
        },
      });
    },
    queryKey: ["credits", idGroup],
    getNextPageParam: (lastPage, allPage) => {
      // return 3;
      // console.log(allPage.length % 10);
      //check if no next page in last page
      // console.log(lastPage);
      // return 1;
      let count = 0;
      allPage.map((p) => (count = count + p.results.length));
      return count != lastPage.count ? allPage.length : undefined;
    },
  });
};

export default useCredits;
