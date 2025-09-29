import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useGroup = <Group>(id: number) => {
  const apiClient = new ApiClient<Group>("sharefund/groups/" + id);
  return useQuery<Group>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["groups", id],
  });
};

export default useGroup;
