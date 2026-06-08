import React, { useState } from 'react';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Inicio from "./Inicio";
import Actividades from "./Actividades";
import QuienesSomos from "./QuienesSomos"; 

// ──────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ──────────────────────────────────────────────
function Home() {
  const cards = [
    { title: 'Actividades',  icon: Brain,        color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales y creativas.',          to: '/actividades' },
    { title: 'Rutinas',      icon: Calendar,     color: 'bg-green-50',  iconColor: 'text-green-600',  desc: 'Organiza el día con rutinas visuales.',                   to: '/rutinas' },
    { title: 'Comunicación', icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Comunicación con pictogramas y apoyo visual.',          to: '/comunicacion' },
    { title: 'Juegos',       icon: Gamepad2,     color: 'bg-blue-50',   iconColor: 'text-blue-600',   desc: 'Juegos educativos para aprender jugando.',               to: '/juegos' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-12 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black">
            <span className="text-blue-600">Aprendamos juntos, </span>
            <span className="text-orange-500">crezcamos juntos</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            En Nexus encontrarás actividades, rutinas, herramientas y recursos diseñados para apoyar a niños niñas y adolescentes neurodivergentes, sus familias y educadores.
          </p>
          <div className="flex gap-4">
            <Link to="/actividades" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Comenzar</Link>
            <Link to="/recursos" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold border border-blue-200">Para familias</Link>
          </div>
        </div>
        <div className="w-80 h-80 bg-blue-200 rounded-full flex items-center justify-center animate-pulse overflow-hidden">
          <img src="/nexus-principal.png" alt="Ilustración principal" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map(card => (
          <Link key={card.title} to={card.to} className={`${card.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all block`}>
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

// ──────────────────────────────────────────────
// PLACEHOLDER para secciones pendientes
// ──────────────────────────────────────────────
function EnConstruccion({ titulo }) {
  return (
    <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
      <h1 className="text-4xl font-black text-blue-900">{titulo}</h1>
      <p className="text-slate-600">Esta sección está en construcción 🚧</p>
      <Link to="/" className="inline-block text-blue-600 font-bold underline">← Volver al inicio</Link>
    </div>
  );
}

// ──────────────────────────────────────────────
// APP PRINCIPAL
// ──────────────────────────────────────────────
function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  const navItems = [
    { label: 'Inicio',         to: '/' },
    { label: 'Actividades',    to: '/actividades' },
    { label: 'Rutinas',        to: '/rutinas' },
    { label: 'Comunicación',   to: '/comunicacion' },
    { label: 'Juegos',         to: '/juegos' },
    { label: 'Recursos',       to: '/recursos' },
    { label: 'Sobre Nosotros', to: '/sobre-nosotros' },
  ];

  return (
    <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
      <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="NEXUS" className="h-12 w-auto" />
          <span className="text-2xl font-black text-blue-900 tracking-tight">NEXUS</span>
        </Link>
        <div className="hidden lg:flex gap-6 font-semibold text-slate-700">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
          {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/rutinas" element={<EnConstruccion titulo="Rutinas" />} />
        <Route path="/comunicacion" element={<EnConstruccion titulo="Comunicación" />} />
        <Route path="/juegos" element={<EnConstruccion titulo="Juegos" />} />
        <Route path="/recursos" element={<EnConstruccion titulo="Recursos" />} />
        <Route path="/sobre-nosotros" element={<QuienesSomos />} /> 
        <Route path="*" element={<EnConstruccion titulo="Página no encontrada" />} />
      </Routes>
    </div>
  );
}

export default App;