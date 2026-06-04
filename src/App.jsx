import React, { useState } from 'react';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Actividades from "./Actividades"; // Asegúrate de que este archivo exista

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
        
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="NEXUS" className="h-12 w-auto" />
            <span className="text-2xl font-black text-blue-900 tracking-tight">NEXUS</span>
          </Link>
          
          <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
            {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
          </button>
        </nav>

        {/* RUTAS */}
        <Routes>
          <Route path="/" element={<HomeContent isCalmMode={isCalmMode} />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Contenido Principal (Hero + Tarjetas)
function HomeContent({ isCalmMode }) {
  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales.', path: '/actividades' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día con rutinas.', path: '#' },
    { title: 'Comunicación', icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Pictogramas y apoyo visual.', path: '#' },
    { title: 'Juegos', icon: Gamepad2, color: 'bg-blue-50', iconColor: 'text-blue-600', desc: 'Juegos educativos.', path: '#' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black mb-4">
            <span className="text-blue-600">Aprendamos juntos, </span>
            <span className="text-orange-500">crezcamos juntos</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">En Nexus encontrarás actividades, rutinas y recursos para apoyar a niños y adolescentes.</p>
        </div>
        <div className="w-80 h-80 bg-blue-200 rounded-full flex items-center justify-center animate-pulse overflow-hidden">
          <img src="/nexus-principal.png" alt="Ilustración" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map(card => (
          <Link to={card.path} key={card.title} className={`${card.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all`}>
            <card.icon size={40} className={`${card.iconColor} mb-4`} />
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{card.desc}</p>
            <ArrowRight size={20} className="text-slate-400" />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default App;