import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Gamepad2, Activity, Calendar, MessageCircle, 
  BookOpen, Users, ArrowLeft, Volume2, Star, Sun 
} from 'lucide-react';

export default function Actividades() {
  const sidebarItems = [
    { icon: Home, label: 'Inicio', to: '/' },
    { icon: Gamepad2, label: 'Juegos', active: true },
    { icon: Activity, label: 'Actividades' },
    { icon: Calendar, label: 'Rutinas' },
    { icon: MessageCircle, label: 'Comunicación' },
    { icon: BookOpen, label: 'Recursos' },
    { icon: Users, label: 'Sobre nosotros' },
  ];

  const emociones = [
    { label: 'Feliz', emoji: '😊', color: 'bg-yellow-100 border-yellow-400 text-yellow-700' },
    { label: 'Triste', emoji: '😢', color: 'bg-blue-100 border-blue-400 text-blue-700' },
    { label: 'Calmado', emoji: '😌', color: 'bg-green-100 border-green-400 text-green-700' },
    { label: 'Preocupado', emoji: '😧', color: 'bg-purple-100 border-purple-400 text-purple-700' },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50 font-sans text-slate-700">
      
      {/* SIDEBAR IZQUIERDA */}
      <aside className="w-64 bg-white shadow-xl flex flex-col p-4 gap-2">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">N</div>
          <span className="text-xl font-black text-blue-900">NEXUS</span>
        </div>
        
        {sidebarItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.to || '#'} 
            className={`flex items-center gap-3 p-3 rounded-2xl font-bold transition-all ${
              item.active ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-blue-50 text-slate-500'
            }`}
          >
            <item.icon size={22} />
            {item.label}
          </Link>
        ))}
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8">
        
        {/* BARRA SUPERIOR (HEADER INTERNO) */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm">
           <Link to="/" className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl font-bold hover:bg-slate-200 transition">
              <ArrowLeft size={20} /> Volver
           </Link>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-2xl">
                <Star className="fill-blue-600" size={20} /> 2 / 6
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-2xl font-bold shadow-md">Modo Calma</button>
           </div>
        </header>

        {/* ÁREA DEL JUEGO */}
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl border-8 border-white overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-4xl font-black text-blue-900 mb-6">¿Cómo se siente?</h2>
            
            {/* ILUSTRACIÓN (RECUADRO AMARILLO) */}
            <div className="bg-yellow-50 rounded-[30px] p-6 mb-8 border-4 border-dashed border-yellow-200 relative">
               <img 
                 src="https://img.freepik.com/vector-gratis/nino-triste-sentado-suelo_1308-129415.jpg" 
                 alt="Niño triste" 
                 className="h-64 mx-auto rounded-2xl object-contain"
               />
            </div>

            {/* BOTONES DE EMOCIONES */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {emociones.map((emo) => (
                <button 
                  key={emo.label}
                  className={`flex flex-col items-center p-4 rounded-3xl border-4 transition-all hover:scale-105 active:scale-95 ${emo.color}`}
                >
                  <span className="text-5xl mb-2">{emo.emoji}</span>
                  <span className="font-black text-lg">{emo.label}</span>
                </button>
              ))}
            </div>

            {/* FOOTER DEL JUEGO */}
            <div className="flex justify-between items-center bg-blue-50 p-6 rounded-[30px]">
              <div className="flex items-center gap-3 text-blue-800 font-bold italic">
                <Sun className="text-orange-400 animate-spin-slow" />
                "¡Tú puedes! No hay respuestas incorrectas."
              </div>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 shadow-lg">
                <Volume2 /> Escuchar situación
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}