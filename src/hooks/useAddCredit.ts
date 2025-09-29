import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { type Transaction } from "./useTransactions";

export interface NewTransaction {
  id?: number;
  description?: string;
  value?: string;
  friend?: number;
  is_charge?: boolean;
  completed_by?: number;
}

const useAddCredit = (idGroup: number) => {
  const client = new ApiClient<Transaction>(
    "sharefund/groups/" + idGroup + "/credits"
  );
  const queryClient = useQueryClient();
  // interface AddTransactionContext {
  //   previousTransations: Transaction[];
  // }
  return useMutation<Transaction, Error, Transaction>({
    mutationFn: client.save,

    onSuccess: (data) => {
      // Invalidate the cache
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

export default useAddCredit;
