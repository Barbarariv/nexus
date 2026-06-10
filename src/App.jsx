import React, { useState } from 'react';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Actividades from "./Actividades";

// ── PLACEHOLDERS ──────────────────────────────────────────────────────────────
function EnConstruccion({ titulo }) {
  return (
    <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
      <h1 className="text-4xl font-black text-blue-900">{titulo}</h1>
      <p className="text-slate-600">Esta sección está en construcción 🚧</p>
      <Link to="/" className="inline-block text-blue-600 font-bold underline">← Volver al inicio</Link>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function Home() {
  const tarjetas = [
    {
      titulo: 'Actividades',
      desc: 'Explora actividades sensoriales y creativas',
      icono: '🎨',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      iconBg: 'bg-purple-100',
      to: '/actividades',
    },
    {
      titulo: 'Rutinas',
      desc: 'Organiza el día con rutinas visuales',
      icono: '📅',
      bg: 'bg-green-50',
      border: 'border-green-100',
      iconBg: 'bg-green-100',
      to: '/rutinas',
    },
    {
      titulo: 'Comunicación',
      desc: 'Comunícate con pictogramas y apoyo visual',
      icono: '💬',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      iconBg: 'bg-orange-100',
      to: '/comunicacion',
    },
    {
      titulo: 'Juegos',
      desc: 'Juegos educativos para aprender jugando',
      icono: '🧩',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      to: '/juegos',
    },
    {
      titulo: 'Recursos',
      desc: 'Guías y herramientas para familias y educadores',
      icono: '📚',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      iconBg: 'bg-pink-100',
      to: '/recursos',
    },
  ];

  return (
    <div className="bg-sky-50 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Texto izquierda */}
          <div className="max-w-lg">
            {/* Estrellas decorativas */}
            <div className="flex gap-1 mb-3">
              <span className="text-yellow-400 text-xl">⭐</span>
              <span className="text-yellow-300 text-sm">✦</span>
              <span className="text-blue-300 text-sm">✦</span>
            </div>
            <h1 className="text-5xl font-black leading-tight mb-4">
              <span className="text-slate-800">Aprendemos juntos,</span><br />
              <span className="text-orange-500">crecemos juntos</span>
            </h1>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Actividades, rutinas y herramientas para<br className="hidden sm:block" />
              niños con TEA y sus familias.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/actividades"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full font-bold shadow-md transition-all hover:shadow-lg">
                <span>❤️</span> Comenzar
              </Link>
              <Link to="/recursos"
                className="flex items-center gap-2 bg-white hover:bg-sky-50 text-slate-700 px-7 py-3 rounded-full font-bold border border-slate-200 shadow-sm transition-all">
                <span>👨‍👩‍👧</span> Para familias
              </Link>
            </div>
          </div>

          {/* Imagen / logo derecha */}
          <div className="relative flex items-center justify-center">
            {/* Piezas de puzzle decorativas */}
            <div className="absolute -left-8 top-4 text-4xl opacity-30 rotate-12">🧩</div>
            <div className="absolute -right-6 bottom-4 text-3xl opacity-20 -rotate-12">🧩</div>
            <div className="absolute right-0 top-0 text-2xl opacity-20">⭐</div>

            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-sky-100" style={{minWidth: 260}}>
              {/* Logo SVG simplificado / imagen */}
              <img src="/logo.png" alt="NEXUS" className="w-28 h-28 object-contain mb-3"
                onError={e => { e.target.style.display='none'; }} />
              <div className="text-4xl font-black text-blue-800 tracking-widest">NEXUS</div>
              <div className="text-xs text-slate-400 font-semibold tracking-widest text-center mt-1">
                FUNDACIÓN DE APOYO INTEGRAL INCLUSIVO
              </div>
            </div>

            {/* Niño ilustración (emoji fallback) */}
            <div className="ml-4 text-8xl select-none hidden lg:block">🧒</div>
          </div>
        </div>
      </section>

      {/* ── TARJETAS DE SECCIONES ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tarjetas.map(t => (
            <Link key={t.titulo} to={t.to}
              className={`${t.bg} ${t.border} border-2 rounded-3xl p-5 flex flex-col gap-3 hover:shadow-md transition-all hover:-translate-y-1 group`}>
              <div className={`${t.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl`}>
                {t.icono}
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm">{t.titulo}</p>
                <p className="text-slate-400 text-xs leading-snug mt-0.5">{t.desc}</p>
              </div>
              <span className="text-slate-400 group-hover:text-blue-500 transition-colors text-sm font-bold">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BANNER CENTRAL ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Para familias */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-all">
            <div className="text-4xl">👨‍👩‍👧</div>
            <div className="flex-1">
              <p className="font-black text-slate-800 mb-1">Para familias</p>
              <p className="text-slate-500 text-sm leading-relaxed">Consejos, acompañamiento y apoyo para el día a día.</p>
              <Link to="/recursos" className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm mt-3 hover:underline">
                Ingresar →
              </Link>
            </div>
          </div>

          {/* Mensaje central */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white text-center flex flex-col justify-center shadow-lg">
            <div className="text-3xl mb-2">💙</div>
            <h2 className="text-xl font-black leading-snug mb-2">
              Aquí todos somos comprendidos, valorados y apoyados.
            </h2>
            <p className="text-blue-200 text-sm">
              Un espacio seguro, inclusivo y lleno de posibilidades.
            </p>
          </div>

          {/* Para educadores */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-all">
            <div className="text-4xl">🎒</div>
            <div className="flex-1">
              <p className="font-black text-slate-800 mb-1">Para educadores</p>
              <p className="text-slate-500 text-sm leading-relaxed">Recursos y herramientas para el aula inclusiva.</p>
              <Link to="/recursos" className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm mt-3 hover:underline">
                Ingresar →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── PIE DE PÁGINA INFO ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center text-slate-500 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-lg">🛡️</span> Espacio seguro
            </div>
            <div className="hidden md:block w-px h-6 bg-slate-200"/>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-lg">💙</span> Diseñado para el bienestar
            </div>
            <div className="hidden md:block w-px h-6 bg-slate-200"/>
            <div className="flex items-center gap-2">
              <span className="text-purple-500 text-lg">🤝</span> Inclusión y respeto
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
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

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav className="flex justify-between items-center px-6 lg:px-12 py-3 bg-white shadow-sm sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="NEXUS" className="h-10 w-auto"
            onError={e => { e.target.style.display='none'; }} />
          <span className="text-xl font-black text-blue-900 tracking-tight">NEXUS</span>
        </Link>

        <div className="hidden lg:flex gap-5 font-semibold text-slate-600 text-sm">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) =>
                `hover:text-blue-600 transition-colors px-2 py-1 rounded-lg ${isActive ? 'text-blue-600 bg-blue-50' : ''}`
              }>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button onClick={() => setIsCalmMode(!isCalmMode)}
          className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 px-5 py-2 rounded-full font-bold text-amber-800 text-sm transition-all">
          {isCalmMode ? '☀️' : '🌙'} Modo Calma
        </button>
      </nav>

      {/* ── BOTÓN FLOTANTE WHATSAPP ─────────────────────────────────── */}
      <a href="https://wa.me/56988094341" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg font-bold transition-all hover:scale-105"
        aria-label="Contactar por WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">+56 9 8809 4341</span>
      </a>

      {/* ── RUTAS ──────────────────────────────────────────────────── */}
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/actividades"    element={<Actividades />} />
        <Route path="/rutinas"        element={<EnConstruccion titulo="Rutinas" />} />
        <Route path="/comunicacion"   element={<EnConstruccion titulo="Comunicación" />} />
        <Route path="/juegos"         element={<EnConstruccion titulo="Juegos" />} />
        <Route path="/recursos"       element={<EnConstruccion titulo="Recursos" />} />
        <Route path="/sobre-nosotros" element={<EnConstruccion titulo="Sobre Nosotros" />} />
        <Route path="*"               element={<EnConstruccion titulo="Página no encontrada" />} />
      </Routes>

    </div>
  );
}

export default App;
