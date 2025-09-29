import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid d-flex justify-content-between">
          <a className="navbar-brand d-flex" href="/">
            <img
              src="/logo-default.png"
              alt="Marvoa Logo"
              width="192"
              height="62"
              className="d-inline-block align-text-top"
            />
            {/* <h1 className="d-inline">Chiquila</h1> */}
          </a>
          {/* {!isLoading && data && (
            
          )} */}
          <a
            href="https://wa.me/447424095648"
            target="_blank"
            className="d-flex align-items-center btn bg-bs-color fs-4"
            style={{ textDecoration: "none" }}
          >
            <img
              src="/whatsapp.png"
              alt="Whatsapp Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            <span className="p-2">Falar Connosco</span>
          </a>
        </div>
      </nav>

      <div className="p-1">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
