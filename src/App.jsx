import React, { useState } from 'react';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Actividades from "./Actividades"; // Asegúrate que este archivo exista

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
        
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-900">NEXUS</span>
          </Link>
          <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
            {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
          </button>
        </nav>

        {/* AQUÍ OCURRE LA MAGIA: Las rutas cambian el contenido */}
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Este es tu contenido principal
function HomeContent() {
  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales.', path: '/actividades' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día.', path: '#' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <h1 className="text-4xl font-black mb-10">Bienvenido a NEXUS</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link to={card.path} key={card.title} className={`${card.color} p-6 rounded-3xl block shadow-sm hover:shadow-lg transition-all`}>
            <card.icon size={40} className={`${card.iconColor} mb-4`} />
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-slate-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default App;