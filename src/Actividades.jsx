import React, { useState } from 'react';

export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos'); // 'ninos' o 'adolescentes'

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Selector de Sección */}
      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setCategoria('ninos')}
          className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'ninos' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-slate-600'}`}
        >
          Niños y Niñas
        </button>
        <button 
          onClick={() => setCategoria('adolescentes')}
          className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'adolescentes' ? 'bg-purple-500 text-white shadow-lg' : 'bg-white text-slate-600'}`}
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

// Componentes de contenido
function SeccionNinos() {
  return (
    <>
      <div className="bg-yellow-100 p-10 rounded-[2rem] text-center">
        <h3 className="text-2xl font-black mb-4">Juegos Sensoriales</h3>
        <p>Actividades diseñadas para explorar texturas y colores.</p>
      </div>
      <div className="bg-blue-100 p-10 rounded-[2rem] text-center">
        <h3 className="text-2xl font-black mb-4">Emociones</h3>
        <p>Aprende a reconocer cómo te sientes hoy.</p>
      </div>
    </>
  );
}

function SeccionAdolescentes() {
  return (
    <>
      <div className="bg-purple-100 p-10 rounded-[2rem] text-center">
        <h3 className="text-2xl font-black mb-4">Gestión de Rutinas</h3>
        <p>Herramientas para organizar el día a día y objetivos.</p>
      </div>
      <div className="bg-green-100 p-10 rounded-[2rem] text-center">
        <h3 className="text-2xl font-black mb-4">Comunicación Social</h3>
        <p>Espacio para reflexión y habilidades sociales.</p>
      </div>
    </>
  );
}

export default Actividades;