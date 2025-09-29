import React, { type FormEvent, useEffect, useState } from "react";
import useAddGroup from "../../hooks/sharefund/useAddGroup";
import type { Group } from "../../hooks/useGroups";
import useEditGroup from "../../hooks/sharefund/useEditGroup";
export interface Client {
  id: number;
  name: string;
  tel: string;
  balance?: string;
}
interface Props {
  group?: Group;
}

const AddNewGroupForm = ({ group }: Props) => {
  const initialForm = {
    id: 0,
    name: "",
    day_of_payment: 0,
    value_of_payment: 0,
    share_percent: 0,
    members: [],
    creator: 0,
  };

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState<string>("");
  const [ok, setOk] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (group)
      setFormData({
        ...formData,

        name: group.name,
        day_of_payment: group.day_of_payment,
        value_of_payment: group.value_of_payment,
        share_percent: group.share_percent,
      });
  }, [group]);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // setFormFriend({ ...formFriend, [e.target.id]: e.target.value });
  };
  //   const userLogin = useAuth();
  const addGroup = useAddGroup();
  const editGroup = useEditGroup(group?.id || 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setError("");
    setOk("");

    setLoading(true);
    if (group) {
      editGroup
        .mutateAsync({
          ...formData,
          ...formData,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setOk("Atualizado com sucesso.");

          // setFormData(initialForm);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError("Algo correu mal");
        });
    } else {
      addGroup
        .mutateAsync({
          ...formData,
          ...formData,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          setFormData(initialForm);
          setOk("Criado com sucesso.");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError("Algo correu mal");
        });
    }

    // userLogin.mutate(formData);
    // console.log(userLogin.isSuccess);

    // Send data to server (e.g., using fetch)
    // console.log(data);
  };
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (value, index) => {
      console.log(value);
      return start + index * step;
    });
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {ok && <div className="alert alert-success">{ok}</div>}

      <form onSubmit={handleSubmit}>
        <div className="p-2 w-100">
          <input
            required
            className="form-control form-control-new"
            type="text"
            name="name"
            id="name"
            placeholder="Nome do grupo"
            value={formData.name}
            onChange={nextInput}
          />
        </div>
        <div className="p-2 w-100">
          <input
            required
            className="form-control form-control-new"
            type="number"
            name="value_of_payment"
            id="value_of_payment"
            min={1}
            placeholder="Valor de Pagamento"
            value={formData.value_of_payment || ""}
            onChange={nextInput}
          />
        </div>
        <div className="p-2 w-100">
          <select
            className="form-select form-control-new rounded-0  border-0 border-bottom shadow-none"
            name="day_of_payment"
            id="day_of_payment"
            value={formData?.day_of_payment || ""}
            onChange={nextSelect}
          >
            <option value={0}>Dia de pagamento...</option>
            {arrayRange(1, 31, 1)?.map((a) => (
              <option key={a} value={a}>
                dia {a} de cada mês
              </option>
            ))}
          </select>
          <div className="p-2 w-100">
            <input
              required
              className="form-control form-control-new"
              type="number"
              name="share_percent"
              id="share_percent"
              placeholder="Percentagem de Retorno"
              value={formData.share_percent || ""}
              onChange={nextInput}
            />
          </div>
        </div>

        <div className="p-2 text-center">
          <button
            className="btn btn-primary"
            disabled={
              loading ||
              formData.name == "" ||
              formData.name.length <= 3 ||
              formData.day_of_payment <= 0 ||
              formData.value_of_payment <= 0 ||
              formData.share_percent < 0 ||
              formData.share_percent > 100
            }
          >
            {loading ? "Salvando..." : !group ? "Criar" : "Atualizar"}
          </button>
        </div>
        <hr />
      </form>
    </>
  );
};

export default AddNewGroupForm;
