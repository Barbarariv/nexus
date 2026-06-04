import React, { useState } from 'react';
import { Palette, Smile, Puzzle, Music, X } from 'lucide-react';

const Actividades = () => {
  const [emocionSeleccionada, setEmocionSeleccionada] = useState(null);

  const emociones = [
    { label: "Feliz", emoji: "😊", color: "bg-yellow-200" },
    { label: "Triste", emoji: "😢", color: "bg-blue-200" },
    { label: "Enojado", emoji: "😡", color: "bg-red-200" },
    { label: "Cansado", emoji: "😴", color: "bg-purple-200" }
  ];

  return (
    <div className="p-12">
      <h2 className="text-4xl font-bold text-slate-800 mb-8">¿Cómo te sientes hoy?</h2>
      
      {/* Panel de Emociones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {emociones.map((emo) => (
          <button 
            key={emo.label}
            onClick={() => setEmocionSeleccionada(emo)}
            className={`${emo.color} p-8 rounded-3xl flex flex-col items-center gap-4 hover:scale-105 transition-all shadow-lg`}
          >
            <span className="text-6xl">{emo.emoji}</span>
            <span className="text-xl font-bold text-slate-800">{emo.label}</span>
          </button>
        ))}
      </div>

      {/* Resultado de la selección */}
      {emocionSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-3xl text-center shadow-2xl max-w-sm w-full">
            <button onClick={() => setEmocionSeleccionada(null)} className="absolute top-4 right-4"><X /></button>
            <div className="text-9xl mb-4">{emocionSeleccionada.emoji}</div>
            <h3 className="text-3xl font-bold mb-2">¡Entendido!</h3>
            <p className="text-xl text-slate-600">Veo que te sientes <strong>{emocionSeleccionada.label}</strong>.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actividades;