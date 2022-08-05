import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams(); //Te permite obtener el id de la ruta

  useEffect(() => {
    setCargando(!cargando);
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando);
    };
    obtenerClienteAPI();
  }, []);

  //Este arrow function es para cuando no haya el id que se ponga en la url
  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p>No Hay Resultados</p>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className="mt-3">Información del Cliente</p>
      <p className="text-3xl text-gray-600 mt-10">
        <span className="text-gray-800 uppercase font-bold">Cliente: </span>
        {cliente.nombre}
      </p>
      <p className="text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>
        {cliente.email}
      </p>
      {cliente.telefono && (
        <p className="text-xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Teléfono: </span>
          {cliente.telefono}
        </p>
      )}
      <p className="text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa: </span>
        {cliente.empresa}
      </p>
      {cliente.notas && (
        <p className="text-xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
