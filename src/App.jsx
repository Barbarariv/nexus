import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Brain, Calendar, Sun, Moon } from 'lucide-react';
import Actividades from "./Actividades";

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen font-sans transition-colors ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
        
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" className="text-2xl font-black text-blue-900">NEXUS</Link>
          <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
            {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
          </button>
        </nav>

        {/* RUTAS */}
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomeContent() {
  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <h1 className="text-4xl font-black mb-10">Bienvenido a NEXUS</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tarjeta de navegación forzada */}
        <Link to="/actividades" className="bg-purple-50 p-6 rounded-3xl block shadow-sm hover:scale-105 transition-transform">
          <Brain size={40} className="text-purple-600 mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Actividades</h3>
          <p className="text-sm text-slate-600 mt-2">Explora actividades sensoriales.</p>
        </Link>
      </div>
    </main>
  );
}

export default App;