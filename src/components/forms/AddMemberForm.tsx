import React, { type FormEvent, useEffect, useState } from "react";
import useAddMember from "../../hooks/sharefund/useAddMember";
import useCustomers, { type Customer } from "../../hooks/useCustomers";

export interface Client {
  id: number;
  name: string;
  tel: string;
  balance?: string;
}

interface Props {
  idGroup: number;
}

const AddMemberForm = ({ idGroup }: Props) => {
  const initialForm = {
    phone: "",
    id: 0,
    member: undefined,
    order: 0,
  };

  const [formData, setFormData] = useState(initialForm);
  // Initialize params with phone as null or undefined initially so the hook doesn't fire
  // until a valid 7-digit number is entered.
  const [params, setParams] = useState<{ search: number | null }>({
    search: null,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // useCustomers hook will only fetch when params.phone is a number (not null)
  const { data, isLoading } = useCustomers<Customer>(params);

  // Effect to update formData.name and tel from fetched customer data
  useEffect(() => {
    if (formData.phone.length >= 7 && data?.results.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        name: `${data.results[0].first_name} ${data.results[0].last_name}`,
        tel: data.results[0].phone, // Assuming Customer type has a phone field
      }));
      setError(""); // Clear any previous "Não encontrado" error
    } else if (
      formData.phone.length >= 7 &&
      data?.results.length === 0 &&
      !isLoading
    ) {
      setError("Cliente não encontrado.");
    } else if (formData.phone.length > 0 && formData.phone.length < 7) {
      setError("Número de telefone incompleto.");
    } else {
      setError(""); // Clear error if input is empty or too long/short
      setFormData((prevData) => ({ ...prevData, name: "", tel: "" })); // Clear name/tel if no match or invalid length
    }
  }, [data, formData.phone.length, isLoading]);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFormData({ ...formData, phone: inputValue });

    if (inputValue.length === 7) {
      // Only set the phone parameter if the length is exactly 7
      setParams({ search: parseInt(inputValue) });
      setError(""); // Clear any existing error
    } else {
      // If length is not 7, reset the phone parameter to null to prevent fetching
      setParams({ search: null });
      // Optionally set an error message if less than 7 digits, or clear if more than 7
      if (inputValue.length > 0 && inputValue.length < 7) {
        setError("Número de telefone incompleto.");
      } else {
        setError(""); // Clear error if input is empty or too long
      }
    }
  };

  const addMember = useAddMember(idGroup);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    addMember
      .mutateAsync({
        ...formData,
        phone: formData.phone, // Assuming ID might be relevant for adding
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormData({
          ...initialForm, // Reset to initial state
        });
        setParams({ search: null }); // Clear params after successful submission
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal ao adicionar o cliente.");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center">
          <h2 className="fs-4 text-center">Novo membro</h2>

          <div className="p-2 flex-grow-1">
            <input
              className="form-control form-control-new"
              type="tel" // Use type="tel" for phone numbers
              name="phone"
              id="phone"
              placeholder="Telemóvel"
              value={formData.phone}
              onChange={nextInput}
              role="presentation"
              autoComplete="off"
              maxLength={7} // Limit input to 7 characters
            />
            {error && <div className="text-danger">{error}</div>}

            {/* Display customer name only if exactly 7 digits are entered and a single customer is found */}
            {formData.phone.length === 7 && data?.results.length === 1 && (
              <div className="text-success text-center">
                {data.results[0].first_name} {data.results[0].last_name}
              </div>
            )}
            {/* Show loading indicator for customer search */}
            {isLoading && formData.phone.length === 7 && (
              <div className="text-info">Buscando cliente...</div>
            )}
          </div>

          <div className="p-2">
            <button
              className="btn btn-primary"
              disabled={
                isLoading || // Disable if customer data is still loading
                formData.phone.length !== 7 || // Disable if phone is not exactly 7 digits
                data?.results.length !== 1 || // Disable if not exactly one customer found for 7 digits
                loading // Disable if form submission is in progress
              }
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddMemberForm;
