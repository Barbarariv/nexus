import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos'); 

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/" className="text-blue-600 font-bold mb-8 block underline">← Volver al inicio</Link>
      
      <div className="flex justify-center gap-4 mb-12">
        <button onClick={() => setCategoria('ninos')} className={`px-8 py-3 rounded-full font-bold ${categoria === 'ninos' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Niños</button>
        <button onClick={() => setCategoria('adolescentes')} className={`px-8 py-3 rounded-full font-bold ${categoria === 'adolescentes' ? 'bg-purple-600 text-white' : 'bg-white'}`}>Adolescentes</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categoria === 'ninos' ? <p>Contenido para niños...</p> : <p>Contenido para adolescentes...</p>}
      </div>
    </div>
  );
}