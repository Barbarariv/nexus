import React, { useState } from 'react';
import { Brain, Calendar, MessageCircle, Gamepad2, ArrowRight, Sun, Moon, Users, BookOpen } from 'lucide-react';

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  const navItems = ['Inicio', 'Actividades', 'Rutinas', 'Comunicación', 'Juegos', 'Recursos', 'Sobre Nosotros'];
  
  const cards = [
    { title: 'Actividades', icon: Brain, color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Explora actividades sensoriales y creativas.' },
    { title: 'Rutinas', icon: Calendar, color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Organiza el día con rutinas visuales.' },
    { title: 'Comunicación', icon: MessageCircle, color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Comunicación con pictogramas y apoyo visual.' },
    { title: 'Juegos', icon: Gamepad2, color: 'bg-blue-50', iconColor: 'text-blue-600', desc: 'Juegos educativos para aprender jugando.' }
  ];

  return (
    <div className={`min-h-screen font-sans ${isCalmMode ? 'bg-slate-900 text-white' : 'bg-sky-50 text-slate-950'}`}>
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="NEXUS" className="h-12 w-auto" />
          <span className="text-2xl font-black text-blue-900 tracking-tight">NEXUS</span>
        </div>
        
        <div className="hidden lg:flex gap-6 font-semibold text-slate-700">
          {navItems.map(item => <a key={item} href="#" className="hover:text-blue-600">{item}</a>)}
        </div>

        <button onClick={() => setIsCalmMode(!isCalmMode)} className="flex items-center gap-2 bg-amber-100 px-6 py-2 rounded-full font-bold text-amber-800">
          {isCalmMode ? <Sun size={18} /> : <Moon size={18} />} Modo Calma
        </button>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-12 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
          <div className="max-w-xl">
        
<h1 className="titulo-principal" translate="no">
  <span className="texto-azul">Aprendamos juntos, </span>
  <span className="texto-naranja">crezcamos juntos.</span>
</h1>
            <p className="text-xl text-slate-600 mb-8">Actividades, rutinas y herramientas para niños con TEA y sus familias.</p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg">Comenzar</button>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold border border-blue-200">Para familias</button>
            </div>
          </div>
          <div className="w-80 h-80 bg-blue-200 rounded-full flex items-center justify-center animate-pulse">
            {/* Aquí iría la ilustración principal */}
          </div>
        </div>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map(card => (
            <div key={card.title} className={`${card.color} p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all`}>
              <card.icon size={40} className={`${card.iconColor} mb-4`} />
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{card.desc}</p>
              <ArrowRight size={20} className="text-slate-400" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;