import React, { useEffect } from "react";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import type { Group } from "../hooks/useGroups";
import useRemain from "../hooks/useRemain";
import useTransactions, { type Transaction } from "../hooks/useTransactions";
import { day, month } from "../services/dates";
import TransactionValue from "./TransactionValue";
interface Props {
  idGroup: number;
  meId?: number;
  group?: Group;
}
const TransactionComponent = ({ idGroup, meId, group }: Props) => {
  const query_param = {
    is_charge: undefined,
    completed: undefined,
    friend: undefined,
    friend_paid: undefined,
    search: undefined,
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactions(query_param, idGroup);
  const { data: balance } = useRemain(query_param, idGroup);

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

  // console.log(balance);
  const remainFromDatabase = (balance?.debit || 0) - (balance?.credit || 0);
  // const remainFromDatabase = 0;
  // console.log(remainFromDatabase);
  // somadetudo + x = balanco
  // x = balanco - somadatydo
  const tenTrans =
    transactions?.reduce(
      (total, page) =>
        total +
        page.reduce((total2, transaction) => {
          if (transaction.is_gain || transaction.is_credit) {
            return total2 - (transaction.value || 0);
          } else if (!transaction.is_confirmed && !transaction.is_debit) {
            return total2;
          } else if (transaction.is_confirmed || transaction.is_debit) {
            return total2 + (transaction.value || 0);
          }
          return total2;
        }, 0),
      0
    ) || 0;

  let values = {
    remain: tenTrans ? remainFromDatabase - tenTrans : remainFromDatabase,
  };
  const handleSetRemain = (value: number) => {
    values = { ...values, remain: value };

    return values.remain;
  };
  useEffect(() => {}, [remainFromDatabase]);

  // console.log(tenTrans);

  // console.log(transactions?.pages.reverse());

  return (
    <>
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
                  {transaction.member?.phone.toString().slice(3, 7)} (
                  {transaction.is_credit
                    ? "crédito"
                    : transaction.is_debit
                    ? "reembolso"
                    : transaction.is_gain
                    ? "entrega chiquila"
                    : "contribuição"}
                  )
                </div>
                <div
                  className="p-2 d-flex flex-column text-center "
                  style={{ width: "11rem" }}
                >
                  <TransactionValue
                    isCreator={meId === group?.creator}
                    transaction={transaction}
                    handleDelete={handleDelete}
                    remain={handleSetRemain(
                      handleSetRemain(
                        transaction.is_gain || transaction.is_credit
                          ? values.remain - (transaction.value || 0)
                          : transaction.is_confirmed || transaction.is_debit
                          ? values.remain + (transaction.value || 0)
                          : values.remain
                      )
                    )}
                  />
                  {/* {transaction.is_gain ? (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        handleSetRemain(
                          values.remain - (transaction.value || 0)
                        )
                      )}
                    />
                  ) : transaction.is_confirmed ? (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={handleSetRemain(
                        handleSetRemain(
                          values.remain + (transaction.value || 0)
                        )
                      )}
                    />
                  ) : (
                    <TransactionValue
                      transaction={transaction}
                      handleDelete={handleDelete}
                      remain={(handleSetRemain(handleSetRemain(values.remain)))}
                    />
                  )} */}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TransactionComponent;
