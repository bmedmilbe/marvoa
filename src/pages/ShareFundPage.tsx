import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewRegisterForm from "../components/NewRegisterForm";
import TransactionComponent from "../components/Transaction";
import { type Customer } from "../hooks/useCustomers";
import useGroup from "../hooks/useGroup";
import type { Group } from "../hooks/useGroups";
import useMe from "../hooks/useMe";
import AddNewGroupForm from "../components/forms/AddNewGroupForm";
const ShareFundPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const nav = useNavigate();
  let id = params.id || "0";
  let newId = parseInt(id);
  const [formOpen, setFormOpen] = useState<boolean>();

  const { data: deliver } = useGroup<Group>(newId);

  const { data: me } = useMe<Customer>();
  // const [boss, setBoss] = useState(newId);

  // useEffect(() => {
  //   setBoss(deliver);
  //   console.log(newId);
  // }, [params]);

  // console.log(deliver);
  // console.log(me);
  // const boss = true;
  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current)
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, 1000);
  }, []);

  return (
    <>
      {/* <LoginForm /> */}

      <div className="d-flex flex-column" style={{ height: "80vh" }}>
        <div className="d-flex">
          <button
            type="button"
            onClick={() => nav("/")}
            className="btn btn-primary m-1"
          >
            {"<"}
          </button>
          <div className="flex-grow-1">
            <h1 className="text-center position-relative">
              <span
                className="badge rounded-pill bg-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setFormOpen(!formOpen)}
              >
                (i)
                <span className="visually-hidden">unread messages</span>
              </span>{" "}
              {deliver?.name}
            </h1>
          </div>
        </div>
        {formOpen && <AddNewGroupForm group={deliver} />}

        <div className="d-flex">
          <button
            type="button"
            onClick={() => nav(`/groups/${newId}/members`)}
            className="btn btn-warning m-1"
          >
            {"Membros"}
          </button>
          <button
            type="button"
            onClick={() => nav(`/credits/${newId}`)}
            className="btn btn-secondary m-1"
          >
            {"Créditos"}
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-secondary m-1"
          >
            {`Disponível: ${deliver?.total_on}`}
          </button>
          <button
            type="button"
            onClick={() => {}}
            className="btn btn-secondary m-1"
          >
            {`Capital Social: ${deliver?.total_in}`}
          </button>
        </div>
        <div
          id="transactions"
          className="flex-grow-1 overflow-scroll overflow-x-hidden"
          ref={chatBoxRef}
        >
          <TransactionComponent meId={me?.id} group={deliver} idGroup={newId} />
        </div>
        <div>
          {/* <button type="button" className="btn btn-success">Introduzir</button> */}
        </div>
        <NewRegisterForm meId={me?.id} group={deliver} deliver={newId} />
      </div>
    </>
  );
};

export default ShareFundPage;
