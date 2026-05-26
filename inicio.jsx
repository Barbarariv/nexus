import { useState } from 'react';

export default function Inicio() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <div className={isCalmMode ? "bg-slate-900 text-white min-h-screen transition-colors" : "bg-blue-50 text-slate-900 min-h-screen transition-colors"}>
      
      {/* Header */}
      <nav className={`flex justify-between items-center p-8 shadow-sm transition-colors ${
        isCalmMode ? "bg-slate-800 text-white" : "bg-white text-blue-900"
      }`}>
        <h1 className="text-3xl font-black">NEXUS</h1>
        <button 
          onClick={() => setIsCalmMode(!isCalmMode)}
          className={`px-6 py-2 rounded-full font-bold transition ${
            isCalmMode ? "bg-purple-700 hover:bg-purple-600" : "bg-blue-100 hover:bg-blue-200 text-blue-800"
          }`}
        >
          {isCalmMode ? "☀️ Modo Día" : "🌙 Modo Calma"}
        </button>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className={`text-5xl font-extrabold mb-6 ${isCalmMode ? "text-white" : "text-slate-900"}`}>
          Aprendemos juntos, crecemos juntos
        </h2>

        <p className={`text-xl mb-12 ${isCalmMode ? "text-slate-300" : "text-slate-600"}`}>
          Actividades, rutinas y herramientas para niños neurodivergentes y sus familias.
        </p>

        <div className="flex justify-center gap-4 mb-20">
          <button className={`px-8 py-3 rounded-full font-bold transition-all ${
            isCalmMode 
              ? "bg-purple-600 text-white hover:bg-purple-700" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
            Comenzar
          </button>
          
          <button className={`px-8 py-3 rounded-full font-bold border-2 transition-all ${
            isCalmMode 
              ? "border-purple-400 text-purple-300 hover:bg-purple-900" 
              : "border-blue-600 text-blue-600 hover:bg-blue-50"
          }`}>
            Para familias
          </button>
        </div>
        
        {/* Grid de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Actividades', 'Rutinas', 'Comunicación', 'Juegos'].map((item) => (
            <div key={item} className={`p-8 rounded-3xl shadow-lg border transition-transform hover:scale-105 ${
              isCalmMode 
                ? "bg-slate-800 border-slate-700" 
                : "bg-white border-blue-100"
            }`}>
              <h3 className={`text-xl font-bold ${isCalmMode ? "text-white" : "text-blue-900"}`}>
                {item}
              </h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}