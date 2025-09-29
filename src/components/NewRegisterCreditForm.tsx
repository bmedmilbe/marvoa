import React, { type FormEvent, useState } from "react";
import type { Group } from "../hooks/useGroups";
import useCustomers, { type Customer } from "../hooks/useCustomers";
import Spinner from "./Spinner";
import useAddCredit from "../hooks/useAddCredit";

interface Props {
  deliver?: number;
  group?: Group;
  meId?: number;
}
const NewRegisterCreditForm = ({ group, meId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addCredit = useAddCredit(group?.id || 0);
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
    id: 0,
    value: 0,
    month: 0,
    year: 0,
    member: 0,
    is_confirmed: false,
    referent_to: currentDate,
    is_gain: false,
    group: group?.id,
    added_at: "",
    day: 0,
    is_debit: false,
    is_credit: false,
    credit_percent: 0,
  });
  const [inputError, setInputError] = useState("");

  const { data: customers, isLoading: customerLoading } =
    useCustomers<Customer>({});

  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    sendForm({
      ...formData,
    });

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };
  const sendForm = (data: any) => {
    setInputError("");
    if (!formData.member) {
      setInputError("Escolha uma pessoa.");

      return;
    } else if (!formData.referent_to) {
      setInputError("Escolha a data.");
      return;
    } else if (!formData.value) {
      setInputError("Insira o valor.");
      return;
    } else if (!formData.is_credit && !formData.credit_percent) {
      setInputError("Insira a percentagem de juros.");
      return;
    } else if (
      (!formData.is_credit && !formData.is_debit) ||
      (formData.is_credit && formData.is_debit)
    ) {
      setInputError("É um crédito ou reembolso?");
      return;
    }

    setIsLoading(true);
    // console.log(formData);
    // return;

    // console.log({ ...formData, referent_to: datee });
    // return;
    console.log(data);
    addCredit
      .mutateAsync(data)
      .then(() => {
        let chatBoxRef = document.getElementById("transactions");
        setFormData({
          ...formData,
          id: 0,
          value: 0,
          month: 0,
          year: 0,
          member: 0,
          is_confirmed: false,
          referent_to: "",
          is_gain: false,
          group: group?.id,
          added_at: "",
          day: 0,
          credit_percent: 0,
        });
        setTimeout(() => {
          if (chatBoxRef) {
            chatBoxRef.scrollTop = chatBoxRef.scrollHeight;
            setIsLoading(false);
          }
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const nextInputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.checked });
  };

  if (customerLoading) return <Spinner />;
  return (
    <>
      {isLoading && <span className="text-success">salvando...</span>}
      {inputError && <span className="text-danger">{inputError}</span>}
      <form onSubmit={handleSubmit}>
        <div className="d-flex m-2">
          {meId === group?.creator && (
            <select
              className="flex-grow-1 form-select rounded-0  border-0 border-bottom shadow-none"
              name="member"
              id="member"
              value={formData?.member}
              onChange={nextSelect}
            >
              <option value={0}>Membro...</option>
              {customers?.results?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a?.first_name} {a?.phone.toString()}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="d-flex">
          <input
            type="date"
            className="form-control rounded-0  border-0 border-bottom shadow-none"
            name="referent_to"
            id="referent_to"
            value={formData?.referent_to}
            onChange={nextInput}
            placeholder="data"
          />
          <input
            type="number"
            className="form-control rounded-0 text-center border-0 border-bottom shadow-none"
            name="value"
            id="value"
            value={formData?.value || ""}
            onChange={nextInput}
            placeholder="montante"
          />
          <input
            type="number"
            className="form-control rounded-0 text-center  border-0 border-bottom shadow-none"
            name="credit_percent"
            id="credit_percent"
            value={formData?.credit_percent || ""}
            onChange={nextInput}
            placeholder="juros"
          />
        </div>
        <div className="d-flex d-flex justify-content-between">
          <div className="form-check text-center w-100 p-2">
            {" "}
            <input
              type="checkbox"
              name="is_credit"
              id="is_credit"
              className="form-check-input float-none mx-auto"
              onChange={nextInputCheck}
            />
            <br />
            <label htmlFor="is_credit" className="form-check-label">
              Crédito
            </label>
          </div>
          <div className="form-check text-center w-100 p-2">
            {" "}
            <input
              type="checkbox"
              name="is_debit"
              id="is_debit"
              className="form-check-input float-none mx-auto"
              onChange={nextInputCheck}
            />
            <br />
            <label htmlFor="is_debit" className="form-check-label">
              Reembolso
            </label>
          </div>
          <button disabled={isLoading} className="p-2 btn btn-primary  m-2">
            {!isLoading ? <span>Guardar &rarr;</span> : "..."}
          </button>
        </div>
        <div className="d-flex">
          {/* <div className="form-check text-center p-2">
            {" "}
            <input
              type="checkbox"
              name="is_charge"
              id="is_charge"
              className="form-check-input float-none mx-auto"
              onChange={nextInputCheck}
            />
            <br />
            <label htmlFor="is_charge" className="form-check-label">
              Carregamento
            </label>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default NewRegisterCreditForm;
