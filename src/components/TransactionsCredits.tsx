import React from "react";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import type { Group } from "../hooks/useGroups";
import { type Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import useCredits from "../hooks/useCredits";
import CreditValue from "./CreditValue";
interface Props {
  idGroup: number;
  meId?: number;
  group?: Group;
}
const TransactionsCredits = ({ idGroup, meId, group }: Props) => {
  const query_param = {
    is_charge: undefined,
    completed: undefined,
    friend: undefined,
    friend_paid: undefined,
    search: undefined,
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useCredits(
    query_param,
    idGroup
  );

  const deleteTransaction = useDeleteTransaction(idGroup);

  const handleDelete = (transaction?: Transaction) => {
    if (!transaction) return;
    // console.log(transaction);
    if (!transaction.is_confirmed) {
      if (confirm("Tem certeza que quer apagar?")) {
        deleteTransaction.mutate(transaction);
        // setTransactions([transactions?.filter((t) => t.id != transaction.id)]);
      }
    } else {
      deleteTransaction.mutate(transaction);
    }
  };
  const transactions = data?.pages
    .slice()
    .reverse()
    .map(({ results }) => results.slice().reverse());

  // console.log(tenTrans);

  // console.log(transactions?.pages.reverse());

  return (
    <>
      <h2 className="text-center">Creditos</h2>

      <button
        className="btn btn-warning w-100"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage || !hasNextPage}
      >
        {isFetchingNextPage ? "Carregando..." : "Ver mais"}
      </button>

      <div>
        {transactions?.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((transaction) => (
              <div
                className="d-flex align-items-center  border m-1  rounded bg-light"
                style={{ width: "100%" }}
                key={transaction.id}
              >
                <div
                  className="p-2 d-flex flex-column text-center "
                  style={{ width: "6rem" }}
                >
                  <span className="fw-bold fs-4">
                    {/* {transaction.id} */}
                    {day(transaction.referent_to)}
                  </span>
                  <span className="text-lowercase">
                    {month(transaction.referent_to)}
                  </span>
                </div>
                <div className="p-2 flex-grow-1 align-self-start">
                  {transaction.member?.first_name}{" "}
                  {transaction.member?.phone.toString().slice(3, 7)}
                </div>
                <div
                  className="p-2 d-flex flex-column text-center "
                  style={{ width: "11rem" }}
                >
                  <CreditValue
                    isCreator={meId === group?.creator}
                    transaction={transaction}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TransactionsCredits;
