import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Brain, Calendar, ArrowRight, Sun, Moon } from 'lucide-react';
import Actividades from "./Actividades";

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

function HomeContent() {
  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales.', path: '/actividades' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día.', path: '/' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <h1 className="text-4xl font-black mb-10">Bienvenido a NEXUS</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link key={card.title} to={card.path} className={`${card.color} p-6 rounded-3xl block shadow-sm hover:shadow-lg transition-transform hover:scale-105`}>
            <card.icon size={40} className={`${card.iconColor} mb-4`} />
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-slate-600 mt-2">{card.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default App;