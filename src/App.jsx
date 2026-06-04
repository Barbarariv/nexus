import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./Inicio";
import Actividades from "./Actividades";
// Importa otros componentes aquí

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-sky-50 font-sans">
        {/* Barra Lateral Fija */}
        <aside className="w-64 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-10">
               <img src="/logo.png" alt="NEXUS" className="h-10" />
               <span className="text-xl font-black text-blue-900">NEXUS</span>
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 font-semibold text-slate-700">🏠 Inicio</Link>
              <Link to="/actividades" className="flex items-center gap-3 p-3 rounded-xl bg-blue-500 text-white font-semibold shadow-md">🎨 Actividades</Link>
            </nav>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/actividades" element={<Actividades />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;