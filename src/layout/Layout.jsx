import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900">
        <h1 className="text-4xl font-black text-center text-white pt-10">
          CRM - Clientes
        </h1>
        <nav className="mt-10">
          <Link
            className={`${
              urlActual === "/clientes"
                ? "text-blue-900 bg-white"
                : "text-white"
            } text-2xl block py-2 pl-5`}
            to="/clientes"
          >
            Clientes
          </Link>
          <Link
            className={`${
              urlActual === "/clientes/nuevo"
                ? "text-blue-900 bg-white"
                : "text-white"
            } text-2xl block border-y-2 border-blue-900 py-2 pl-5`}
            to="/clientes/nuevo"
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
