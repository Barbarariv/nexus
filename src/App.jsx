import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';
import Actividades from "./Actividades";

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

        {/* CONTENEDOR DE RUTAS */}
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// He movido tu contenido principal aquí para que solo aparezca en el home
function HomeContent() {
  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales.', link: '/actividades' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día.', link: '#' },
    { title: 'Comunicación', icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Pictogramas y apoyo visual.', link: '#' },
    { title: 'Juegos', icon: Gamepad2, color: 'bg-blue-50', iconColor: 'text-blue-600', desc: 'Juegos educativos.', link: '#' }
  ];

  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <h1 className="text-3xl font-black mb-8">Aprendamos juntos, crezcamos juntos</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {cards.map(card => (
          <Link to={card.link} key={card.title} className={`${card.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all`}>
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