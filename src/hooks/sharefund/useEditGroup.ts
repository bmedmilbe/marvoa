import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Group } from "../useGroups";

const useEditGroup = (idGroup: number) => {
  const apiClient = new ApiClient<Group>(`sharefund/groups/` + idGroup);
  const queryClient = useQueryClient();

  return useMutation<Group, Error, Group>({
    mutationFn: apiClient.update,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["groups", idGroup])]);
      Promise.all([queryClient.invalidateQueries(["groups"])]);
    },
  });
};

export default useEditGroup;
