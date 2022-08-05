import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  //Recibe los datos del formulario
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(40, "El nombre es muy largo")
      .required("El nombre del Cliente es Obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es Obligatorio"),
    email: Yup.string()
      .email("email no válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("El número no es válido"),
  });

  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      //checa si existe el id
      if (cliente.id) {
        //Editando un Registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT", //tipo de método para actualizar
          //Se le esta enviando la informacion que se genera en el form
          body: JSON.stringify(valores),
          headers: {
            //Pasando configuracion de por si de json diciendo que se le esta pasando contenido de tipo application
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          //Se le esta enviando la informacion que se genera en el form
          body: JSON.stringify(valores),
          headers: {
            //Pasando configuracion de por si de json diciendo que se le esta pasando contenido de tipo application
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-lg md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "", //hace la funcion como un ternario. Si tiene valor cliente nombre agregalo, si no coloca un vacio
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        //muestra los valores que se le den en initialValues
        enableReinitialize={true}
        onSubmit={async (valores, { resetForm }) => {
          handleSubmit(valores);
          //Para que una vez enviado el formulario se resetee
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {/*El touched sirve para que haga la validacion en el instante sin tener que esperar a que se envie*/}
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:{" "}
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-100 rounded-md"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-100 rounded-md h-40 resize-none"
                  placeholder="Notas"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
