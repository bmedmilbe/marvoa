import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";
import type { Member } from "./useGroupMembers";

export interface Transaction {
  id: number;
  value: number;
  referent_to: string;

  member: Member;
  is_confirmed: boolean;
  is_gain: boolean;
  group: number;
  added_at: string;
  is_credit: boolean;
  is_debit: boolean;
  credit_percent: number;
}
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

const useTransactions = (query_params: QueryParams, idGroup: number) => {
  const apiClient = new ApiClient<Transaction>(
    "sharefund/groups/" + idGroup + "/contributions"
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
    queryKey: ["sharefunds", idGroup],
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

export default useTransactions;
