import React, { useState } from "react";
import useGroups from "../hooks/useGroups";
import { NavLink } from "react-router-dom";
import AddNewGroupForm from "../components/forms/AddNewGroupForm";

const GroupsPage = () => {
  const { data: groups } = useGroups({});
  const [formOpen, setFormOpen] = useState<boolean>();

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1 className="text-center">Meus Grupos</h1>
        <button
          className={`btn ${formOpen ? "btn-danger" : "btn-primary"}`}
          onClick={() => setFormOpen(!formOpen)}
        >
          {formOpen ? "X" : "Criar novo grupo"}
        </button>
      </div>
      {formOpen && <AddNewGroupForm />}

      <div className="text-center">
        {groups?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results?.map((group) => (
              <NavLink key={group.id} to={"/groups/" + group.id}>
                {" "}
                <button type="button" className="btn btn-primary p-4 fs-4">
                  {group.name}{" "}
                  <span className="badge text-bg-secondary">
                    {group.members.length} membros
                  </span>
                </button>
              </NavLink>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
