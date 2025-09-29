import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { GroupMember } from "../useGroupMembers";

const useAddMember = (idGroup: number) => {
  const apiClient = new ApiClient<GroupMember>(
    "sharefund/groups/" + idGroup + "/members"
  );
  const queryClient = useQueryClient();

  return useMutation<GroupMember, Error, GroupMember>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["group", idGroup])]);
    },
  });
};

export default useAddMember;
