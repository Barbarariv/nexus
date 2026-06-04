import React, { useState } from 'react';

export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos'); 

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Selector de Sección */}
      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setCategoria('ninos')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${categoria === 'ninos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Niños y Niñas
        </button>
        <button 
          onClick={() => setCategoria('adolescentes')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${categoria === 'adolescentes' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Adolescentes
        </button>
      </div>

      {/* Contenido Dinámico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categoria === 'ninos' ? (
          <SeccionNinos />
        ) : (
          <SeccionAdolescentes />
        )}
      </div>
    </div>
  );
}

// Componentes internos definidos en el mismo archivo
function SeccionNinos() {
  return (
    <>
      <div className="bg-yellow-50 border border-yellow-100 p-10 rounded-[2rem] text-center shadow-sm">
        <h3 className="text-2xl font-black mb-4 text-yellow-800">Juegos Sensoriales</h3>
        <p className="text-slate-600">Actividades diseñadas para explorar texturas y colores.</p>
      </div>
      <div className="bg-blue-50 border border-blue-100 p-10 rounded-[2rem] text-center shadow-sm">
        <h3 className="text-2xl font-black mb-4 text-blue-800">Emociones</h3>
        <p className="text-slate-600">Aprende a reconocer cómo te sientes hoy.</p>
      </div>
    </>
  );
}

function SeccionAdolescentes() {
  return (
    <>
      <div className="bg-purple-50 border border-purple-100 p-10 rounded-[2rem] text-center shadow-sm">
        <h3 className="text-2xl font-black mb-4 text-purple-800">Gestión de Rutinas</h3>
        <p className="text-slate-600">Herramientas para organizar el día a día y objetivos.</p>
      </div>
      <div className="bg-green-50 border border-green-100 p-10 rounded-[2rem] text-center shadow-sm">
        <h3 className="text-2xl font-black mb-4 text-green-800">Comunicación Social</h3>
        <p className="text-slate-600">Espacio para reflexión y habilidades sociales.</p>
      </div>
    </>
  );
}