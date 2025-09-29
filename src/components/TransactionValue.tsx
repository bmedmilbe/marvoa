import { useEffect, useState } from "react";
import { type Transaction } from "../hooks/useTransactions";
import useCompleteTransaction from "../hooks/useCompleteTransaction";

interface Props {
  transaction: Transaction;
  remain: number;

  handleDelete: (transaction?: Transaction) => void;
  isCreator: boolean;
}
const TransactionValue = ({
  transaction,
  handleDelete,
  remain,
  isCreator,
}: Props) => {
  const updateTransaction = useCompleteTransaction(transaction.group);

  const [value, setValue] = useState<number>();
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>();
  const [gain, setGain] = useState<boolean>();

  useEffect(() => {
    // console.log(transaction);
    setValue(transaction.value || 0);
    setCurrentTransaction(transaction);
    setGain(transaction.is_gain);
    setColor(handleColor(transaction));
  }, [currentTransaction]);
  //   const remain = valuesIGot + 0;
  const [buttonsOpen, setButtonsOpen] = useState(false);
  const handleComplete = (transaction: Transaction | undefined) => {
    if (!transaction) return;
    // console.log(transaction);
    if (!transaction.is_confirmed) {
      if (confirm("Tem certeza que quer concluir?")) {
        updateTransaction
          .mutateAsync(transaction)
          .then((res) => {
            // console.log(res);
            if (res.is_confirmed) {
              setCurrentTransaction(res);
              setColor(handleColor(res));
              setGain(res.is_confirmed);
              setButtonsOpen(false);
            }
          })
          .catch((err) => console.log({ error: err }));
      }
    } else {
      alert("Informe ao gestor.");
    }
  };

  // useEffect(() => {
  //   setValue(currentTransaction.value);
  //   setColor(handleColor(currentTransaction));
  //   if (completed) {
  //     //should check who completed the transaction
  //     //   setValuesIGot(valuesIGot - transaction.value);
  //     //   setRemain(valuesIGot);
  //   }
  // }, []);

  const [color, setColor] = useState("");

  const handleColor = (tr: Transaction) => {
    // console.log(tr);
    if (tr.is_gain || tr.is_credit) return "text-secondary";
    if (tr.is_confirmed || tr.is_debit) return "text-success";
    return "text-warning";
  };

  const formatNumberWithCommas = (number: number) => {
    if (typeof number !== "number") {
      return "Invalid input. Please provide a number.";
    }

    if (Math.abs(number) < 1000) {
      return number.toString(); // No commas needed for numbers less than 1000
    }

    return number.toLocaleString(); // Use toLocaleString() for easy comma formatting
  };

  return (
    <>
      <span
        className={`fw-bold fs-4 ${color}`}
        style={{ cursor: "pointer" }}
        onClick={() => setButtonsOpen(!buttonsOpen)}
      >
        {gain || transaction.is_credit ? "-" : ""}
        {formatNumberWithCommas(value || 0)}
      </span>
      <span
        className="badge text-success text-lowercase"
        id={`hf${currentTransaction?.id}`}
      >
        {formatNumberWithCommas(remain)}
      </span>
      {buttonsOpen && isCreator && (
        <div className="d-flex justify-content-center border">
          {!transaction.is_confirmed && !transaction.is_gain && (
            <button
              onClick={() => handleComplete(currentTransaction)}
              className="m-1 btn btn-success btn-sm"
            >
              {updateTransaction.isLoading ? "Salvando..." : "Confirmar"}
            </button>
          )}
          <button
            onClick={() => handleDelete(currentTransaction)}
            className="m-1 btn btn-danger btn-sm"
          >
            Apagar
          </button>
        </div>
      )}
    </>
  );
};

export default TransactionValue;
