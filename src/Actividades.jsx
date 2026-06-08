import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const contenidoActividades = {
  ninos: [
    { 
      id: 1, 
      titulo: "El Rincón de la Calma", 
      desc: "Ejercicios de respiración.", 
      contenido: "Instrucciones: Inhala profundamente por la nariz contando hasta 4, mantén el aire 4 segundos y exhala suavemente por la boca en 4 segundos. ¡Hazlo 3 veces!", 
      icono: "🎈",
      imagen: "https://images.unsplash.com/photo-1544604928-11100084f7cb?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: 2, 
      titulo: "Búsqueda de Tesoros", 
      desc: "Busca 3 objetos azules.", 
      contenido: "¡Es hora de explorar! Mira a tu alrededor y encuentra tres cosas de color azul. ¡Dime cuáles son y para qué sirven!", 
      icono: "🔍",
      imagen: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop" 
    }
  ],
  adolescentes: [
    { 
      id: 3, 
      titulo: "Técnica Pomodoro", 
      desc: "25 min de foco.", 
      contenido: "Configura un temporizador de 25 minutos. Durante este tiempo, concéntrate únicamente en una tarea. Cuando suene, descansa 5 minutos. ¡Repite!", 
      icono: "⏱️",
      imagen: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      id: 4, 
      titulo: "Desafío de Gratitud", 
      desc: "Escribe 3 cosas positivas.", 
      contenido: "Toma un papel y escribe 3 cosas que agradeces hoy. Puede ser algo pequeño, como un café rico o una buena charla.", 
      icono: "✍️",
      imagen: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop" 
    }
  ]
};

export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos');
  const [seleccionada, setSeleccionada] = useState(null);

  if (seleccionada) {
    return (
      <div className="p-8 max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100">
        <button onClick={() => setSeleccionada(null)} className="text-blue-600 font-bold mb-4">← Volver a la lista</button>
        <img src={seleccionada.imagen} alt={seleccionada.titulo} className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md" />
        <h2 className="text-3xl font-black mb-4 text-slate-900">{seleccionada.titulo}</h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-8">{seleccionada.contenido}</p>
        <button onClick={() => alert("¡Excelente trabajo completando la actividad!")} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors">¡Lo logré!</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/" className="text-blue-600 font-bold mb-8 block underline">← Volver al inicio</Link>
      <div className="flex justify-center gap-4 mb-12">
        <button onClick={() => setCategoria('ninos')} className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'ninos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600'}`}>Niños</button>
        <button onClick={() => setCategoria('adolescentes')} className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'adolescentes' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-purple-600'}`}>Adolescentes</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contenidoActividades[categoria].map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{item.icono}</div>
            <h3 className="text-xl font-bold text-slate-800">{item.titulo}</h3>
            <p className="text-slate-600 mb-6">{item.desc}</p>
            <button onClick={() => setSeleccionada(item)} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700">Comenzar</button>
          </div>
        ))}
      </div>
    </div>
  );
}