import React, { useState } from 'react';

function App() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  return (
    <div className={isCalmMode ? "bg-slate-900 text-white min-h-screen transition-colors" : "bg-blue-50 text-slate-900 min-h-screen transition-colors"}>
      {/* Header */}
      <nav className="flex justify-between items-center p-8 bg-white shadow-sm">
        <h1 className="text-3xl font-black text-blue-900">NEXUS</h1>
        <button 
          onClick={() => setIsCalmMode(!isCalmMode)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full font-bold transition"
        >
          {isCalmMode ? "☀️ Modo Día" : "🌙 Modo Calma"}
        </button>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-6">Aprendemos juntos, crecemos juntos</h2>
        <p className="text-xl text-slate-600 mb-12">Actividades, rutinas y herramientas para niños neurodivergentes y sus familias.</p>
        
        {/* Grid de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Actividades', 'Rutinas', 'Comunicación', 'Juegos'].map((item) => (
            <div key={item} className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100 hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold text-blue-900">{item}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;