import React from 'react';

function Actividades() {
  const emociones = [
    { nombre: 'Feliz', emoji: '😊', color: 'bg-yellow-50 border-yellow-200' },
    { nombre: 'Triste', emoji: '😢', color: 'bg-blue-50 border-blue-200' },
    { nombre: 'Calmado', emoji: '😌', color: 'bg-green-50 border-green-200' },
    { nombre: 'Preocupado', emoji: '😟', color: 'bg-purple-50 border-purple-200' },
  ];

  return (
    <main className="max-w-4xl mx-auto px-12 py-16 text-center">
      {/* Título e instrucción */}
      <h2 className="text-3xl font-black text-slate-800 mb-2">¿Cómo se siente?</h2>
      <p className="text-lg text-slate-600 mb-10">
        Mira la situación y elige la emoción que corresponde.
      </p>

      {/* Imagen de la situación */}
      <div className="flex justify-center mb-12">
        <img 
          src="/niño.feliz.png" // nombre de tu imagen
          alt="Situación del superhéroe" 
          className="rounded-3xl shadow-lg max-w-sm" 
        />
      </div>

      {/* Tarjetas de emociones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {emociones.map((emocion) => (
          <div 
            key={emocion.nombre} 
            className={`${emocion.color} p-6 rounded-3xl border-4 hover:shadow-lg transition-all cursor-pointer`}
          >
            <span className="text-5xl mb-3 block">{emocion.emoji}</span>
            <p className="font-bold text-slate-800">{emocion.nombre}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Actividades;