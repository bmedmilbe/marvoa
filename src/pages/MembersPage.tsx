import { Link, useNavigate, useParams } from "react-router-dom";
import AddMemberForm from "../components/forms/AddMemberForm";
import useGroup from "../hooks/useGroup";
import type { Group } from "../hooks/useGroups";

const MembersPage = () => {
  const params = useParams();
  const nav = useNavigate();
  let id = params.id || "0";
  let newId = parseInt(id);

  const { data } = useGroup<Group>(newId);

  // const { data } = useClients();
  return (
    <>
      <div className="d-flex">
        <button
          type="button"
          onClick={() => nav("/groups/" + newId)}
          className="btn btn-primary m-1"
        >
          {"< " + data?.name}
        </button>
        <div className="flex-grow-1">
          <h1 className="text-center">Membros</h1>
        </div>
      </div>
      <AddMemberForm idGroup={newId} />

      <div className="list-group">
        {data?.members?.map((client, key) => (
          <Link
            key={key}
            // to={`/group/${client.member?.id}/member`}
            to={`#`}
            className="list-group-item list-group-item-action d-flex"
            aria-current="true"
          >
            <span className="flex-grow-1 p-2">
              &rarr; {client.order}: {client.member?.first_name}{" "}
              {client.member?.last_name} {client.member?.phone}
            </span>
            {/* <div
              className={`fw-bold p-2 ${
                parseInt(client?.balance || "0") >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {client?.balance} em dívida
            </div> */}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MembersPage;
