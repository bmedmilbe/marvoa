import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { type Transaction } from "./useTransactions";

const useDeleteTransaction = (idGroup: number) => {
  const client = new ApiClient<Transaction>(
    "sharefund/groups/" + idGroup + "/contributions"
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Transaction) => client.deleteTransaction(data?.id || 0),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(["sharefunds", idGroup]),
        queryClient.invalidateQueries(["groups", idGroup]),
        queryClient.invalidateQueries(["credits", idGroup]),
        queryClient.invalidateQueries(["remain", {}]),
      ]);
    },
  });
};

export default useDeleteTransaction;
