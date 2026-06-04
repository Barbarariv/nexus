export default function Actividades() {
  return (
    <div className="bg-white rounded-[2rem] p-10 h-full shadow-lg border border-slate-100">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <button className="px-6 py-2 bg-slate-100 rounded-full font-bold text-slate-600">← Volver</button>
        <h2 className="text-4xl font-black text-slate-800">¿Cómo se siente?</h2>
        <div className="font-bold text-slate-500">2 / 6 ⭐</div>
      </div>

      {/* Área central */}
      <div className="bg-orange-50 rounded-3xl h-80 flex items-center justify-center mb-8 border-2 border-orange-100">
        <p className="text-slate-400">Aquí va la imagen o historia de la situación</p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-4 gap-6">
        {['Feliz', 'Triste', 'Calmado', 'Preocupado'].map((emo) => (
          <button className="border-2 border-slate-100 p-8 rounded-3xl flex flex-col items-center hover:border-blue-300 transition-all">
            <span className="text-6xl mb-4">😊</span>
            <span className="font-bold text-lg text-slate-700">{emo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Actividades;