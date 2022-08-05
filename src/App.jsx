import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import EditarCliente from "./paginas/EditarCliente";
import Inicio from "./paginas/Inicio";
import NuevoCliente from "./paginas/NuevoCliente";
import VerCliente from "./paginas/VerCliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Así (con ese tipo de cierre se define un grupo de rutas) */}
        <Route path="/clientes" element={<Layout />}>
          {/* Así se deifine una unica ruta*/}
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
