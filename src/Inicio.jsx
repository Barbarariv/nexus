import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Inicio() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales y creativas.', link: '/actividades' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día con rutinas visuales.', link: '#' },
    { title: 'Comunicación', icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Comunicación con pictogramas y apoyo visual.', link: '#' },
    { title: 'Juegos', icon: Gamepad2, color: 'bg-blue-50', iconColor: 'text-blue-600', desc: 'Juegos educativos para aprender jugando.', link: '#' }
  ];

  return (
    <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-blue-900 tracking-tight">NEXUS</span>
        </div>
        
        <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
          {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
        </button>
      </nav>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-12 py-16">
        <h1 className="text-3xl font-black mb-12">
          <span className="text-blue-600">Aprendamos juntos, </span>
          <span className="text-orange-500">crezcamos juntos</span>
        </h1>

        {/* GRID DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
           <Link to="/actividades"> {/* 2. ENVUELVE LA TARJETA EN UN LINK */}
  <div className={`${card.color} p-6 rounded-3xl ...`}>
    <card.icon size={40} className={`${card.iconColor} mb-4`} />
    <h3 className="text-xl font-bold">{card.title}</h3>
  </div>
</Link>
          ))}
        </div>
      </main>
    </div>
  );
}