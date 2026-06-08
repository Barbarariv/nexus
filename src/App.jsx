import React, { useState } from 'react';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon } from 'lucide-react';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Inicio from "./Inicio";          // Verifica que el nombre del archivo sea exacto
import Actividades from "./Actividades";

// ──────────────────────────────────────────────
// PÁGINA PRINCIPAL (lo que antes estaba "quemado" dentro de App)
// ──────────────────────────────────────────────
function Home() {
  const cards = [
    { title: 'Actividades',   icon: Brain,         color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales y creativas.',          to: '/actividades' },
    { title: 'Rutinas',       icon: Calendar,      color: 'bg-green-50',  iconColor: 'text-green-600',  desc: 'Organiza el día con rutinas visuales.',                  to: '/rutinas' },
    { title: 'Comunicación',  icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Comunicación con pictogramas y apoyo visual.',           to: '/comunicacion' },
    { title: 'Juegos',        icon: Gamepad2,      color: 'bg-blue-50',   iconColor: 'text-blue-600',   desc: 'Juegos educativos para aprender jugando.',               to: '/juegos' },
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
            <Link
              to="/actividades"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              Comenzar
            </Link>
            <Link
              to="/recursos"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold border border-blue-200"
            >
              Para familias
            </Link>
          </div>
        </div>

        <div className="w-80 h-80 bg-blue-200 rounded-full flex items-center justify-center animate-pulse overflow-hidden">
          <img
            src="/nexus-principal.png"
            alt="Ilustración principal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TARJETAS — ahora cada una navega */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map(card => (
          <Link
            key={card.title}
            to={card.to}
            className={`${card.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all block`}
          >
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
// PLACEHOLDER para secciones que aún no construyes
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
// APP = "cascarón" persistente (navbar + Modo Calma) + rutas
// ──────────────────────────────────────────────
function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  const navItems = [
    { label: 'Inicio',          to: '/' },
    { label: 'Actividades',     to: '/actividades' },
    { label: 'Rutinas',         to: '/rutinas' },
    { label: 'Comunicación',    to: '/comunicacion' },
    { label: 'Juegos',          to: '/juegos' },
    { label: 'Recursos',        to: '/recursos' },
    { label: 'Sobre Nosotros',  to: '/sobre-nosotros' },
  ];

  return (
    <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>

      {/* NAVBAR (se muestra en todas las páginas) */}
      <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="NEXUS" className="h-12 w-auto" />
          <span className="text-2xl font-black text-blue-900 tracking-tight">NEXUS</span>
        </Link>

        <div className="hidden lg:flex gap-6 font-semibold text-slate-700">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => setIsCalmMode(!isCalmMode)}
          className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800"
        >
          {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
        </button>
      </nav>
      
       {/* BOTÓN FLOTANTE WHATSAPP */}
<a
  href="https://wa.me/56988094341"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-all hover:scale-105"
  aria-label="Contactar por WhatsApp"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span className="hidden sm:inline">+56 9 8809 4341</span>
</a>
      {/* RUTAS */}
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/inicio"          element={<Inicio />} />
        <Route path="/actividades"     element={<Actividades />} />
        <Route path="/rutinas"         element={<EnConstruccion titulo="Rutinas" />} />
        <Route path="/comunicacion"    element={<EnConstruccion titulo="Comunicación" />} />
        <Route path="/juegos"          element={<EnConstruccion titulo="Juegos" />} />
        <Route path="/recursos"        element={<EnConstruccion titulo="Recursos" />} />
        <Route path="/sobre-nosotros"  element={<EnConstruccion titulo="Sobre Nosotros" />} />
        <Route path="*"                element={<EnConstruccion titulo="Página no encontrada" />} />
      </Routes>
    </div>
  );
}

export default App;
