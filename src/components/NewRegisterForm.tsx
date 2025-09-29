import React, { type FormEvent, useState } from "react";
import useAddTransation from "../hooks/useAddTransation";
import type { Group } from "../hooks/useGroups";
import { months } from "../services/dates";

interface Props {
  deliver?: number;
  group?: Group;
  meId?: number;
}
const NewRegisterForm = ({ group, meId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addTransaction = useAddTransation(group?.id || 0);
  const [formData, setFormData] = useState({
    id: 0,
    value: group?.value_of_payment,
    month: 0,
    year: 0,
    member: 0,
    is_confirmed: false,
    referent_to: "",
    is_gain: false,
    group: group?.id,
    added_at: "",
  });
  const [inputError, setInputError] = useState("");

  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    let datee = `${formData.year}-${
      formData.month < 10 ? "0" + formData.month : formData.month
    }-${group?.day_of_payment}`;

    sendForm({
      ...formData,
      referent_to: datee,
      is_gain: false,
      member:
        meId !== group?.creator
          ? parseInt(`${meId}`)
          : parseInt(`${formData.member}`),
    });

    // if (!addTransaction.isLoading && addTransaction?.data?.id) {
    //   addFriend.mutate({ ...formFriend, id: addTransaction.data.id });
    // }
  };
  const sendForm = (data: any) => {
    setInputError("");
    if (meId === group?.creator && !formData.member) {
      setInputError("Escolha o membro.");

      return;
    } else if (!formData.month) {
      setInputError("Escolha o mês.");
      return;
    } else if (!formData.year) {
      setInputError("Escolha o ano.");
      return;
    }
    setIsLoading(true);
    // console.log(formData);
    // return;

    // console.log({ ...formData, referent_to: datee });
    // return;
    console.log(data);
    addTransaction
      .mutateAsync(data)
      .then(() => {
        let chatBoxRef = document.getElementById("transactions");
        setFormData({ ...formData, member: 0 });
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
              {group?.members?.map((a) => (
                <option key={a.member?.id} value={a.member?.id}>
                  {a.member?.first_name}{" "}
                  {a.member?.phone.toString().slice(3, 7)}
                </option>
              ))}
            </select>
          )}

          <select
            className="form-select rounded-0  border-0 border-bottom shadow-none"
            name="month"
            id="month"
            value={formData?.month}
            onChange={nextSelect}
          >
            <option value={0}>Mês...</option>
            {months?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.id < 10 ? `0${a.id}` : a.id}
                {"-"}
                {a.name}
              </option>
            ))}
          </select>
          <select
            className="form-select rounded-0  border-0 border-bottom shadow-none"
            name="year"
            id="year"
            value={formData?.year}
            onChange={nextSelect}
          >
            <option value={0}>Ano...</option>
            {[2025]?.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          {/* <div className="py-2 w-100">
            <input
              className="form-control rounded-0 border-0 border-0 border-bottom shadow-none"
              type="text"
              name="referent_to"
              id="referent_to"
              placeholder="Valor"
              min={1}
              value={formData.value}
              onChange={nextInput}
            />
          </div> */}
        </div>
        <div className="d-flex">
          <button
            disabled={isLoading}
            className="p-2 btn btn-primary w-100 m-2"
          >
            {!isLoading ? <span>Pagou &rarr;</span> : "..."}
          </button>
          {meId && meId === group?.creator && (
            <span
              className="p-2 btn btn-secondary w-100 m-2"
              onClick={() => {
                let datee = `${formData.year}-${
                  formData.month < 10 ? "0" + formData.month : formData.month
                }-${group?.day_of_payment}`;
                sendForm({ ...formData, referent_to: datee, is_gain: true });
              }}
            >
              {!isLoading ? <span>Recebeu &rarr;</span> : "..."}
            </span>
          )}

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

export default NewRegisterForm;
