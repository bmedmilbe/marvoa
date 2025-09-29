import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { type Transaction } from "./useTransactions";

const useCompleteTransaction = (idGroup: number) => {
  const client = new ApiClient<Transaction>(
    "sharefund/groups/" + idGroup + "/contributions"
  );
  const queryClient = useQueryClient();

  return useMutation<Transaction, Error, Transaction>({
    mutationFn: (data: Transaction) => client.completeTransaction(data.id || 0),

    onSuccess: (data) => {
      console.log(data);
      Promise.all([
        queryClient.invalidateQueries(["sharefunds", idGroup]),
        queryClient.invalidateQueries(["groups", idGroup]),
        queryClient.invalidateQueries(["credits", idGroup]),
        queryClient.invalidateQueries(["remain", {}]),
      ]);
    },
  });
};

export default useCompleteTransaction;
