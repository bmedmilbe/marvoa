import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Group } from "../useGroups";

const useAddGroup = () => {
  const apiClient = new ApiClient<Group>(`sharefund/groups`);
  const queryClient = useQueryClient();

  return useMutation<Group, Error, Group>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["groups"])]);
    },
  });
};

export default useAddGroup;
