import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";
import type { GroupMember } from "./useGroupMembers";

export interface Group {
  id: number;
  name: string;
  day_of_payment: number;
  value_of_payment: number;
  share_percent: number;
  members: GroupMember[];
  creator: number;
  total_in?: string;
  total_on?: string;
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

const useGroups = (query_params: QueryParams) => {
  const apiClient = new ApiClient<Group>("sharefund/groups");
  return useInfiniteQuery<ResponseA<Group>>({
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
    queryKey: ["groups"],
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

export default useGroups;
