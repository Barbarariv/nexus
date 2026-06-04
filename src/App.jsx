import React from 'react';
import { HashRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <nav style={{ padding: 20, borderBottom: '1px solid black' }}>
        <Link to="/" style={{ marginRight: 20 }}>Inicio</Link>
        <Link to="/actividades">Ir a Actividades</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/actividades" element={<h1>¡Estás en la pantalla de Actividades!</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App;