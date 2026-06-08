import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const contenidoActividades = {
  ninos: [
    { 
      titulo: "El Rincón de la Calma", 
      desc: "Ejercicios de respiración guiada para cuando nos sentimos abrumados.",
      icono: "🎈" 
    },
    { 
      titulo: "Búsqueda de Tesoros", 
      desc: "Busca 3 objetos de color azul en tu habitación para mejorar la atención.",
      icono: "🔍" 
    },
    { 
      titulo: "Diario de Emociones", 
      desc: "Dibuja hoy cómo te sientes: ¿Feliz, tranquilo o cansado?",
      icono: "🎨" 
    }
  ],
  adolescentes: [
    { 
      titulo: "Técnica Pomodoro", 
      desc: "25 minutos de estudio concentrado seguidos de 5 minutos de descanso.",
      icono: "⏱️" 
    },
    { 
      titulo: "Desafío de Gratitud", 
      desc: "Escribe 3 cosas positivas que te hayan pasado hoy y por qué.",
      icono: "✍️" 
    },
    { 
      titulo: "Planificación Semanal", 
      desc: "Organiza tus tareas principales y prioriza tus objetivos.",
      icono: "📅" 
    }
  ]
};

export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos'); 

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/" className="text-blue-600 font-bold mb-8 block underline">← Volver al inicio</Link>
      
      <h1 className="text-4xl font-black text-center text-slate-900 mb-8">Nuestras Actividades</h1>

      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setCategoria('ninos')} 
          className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'ninos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600'}`}>
          Para Niños
        </button>
        <button 
          onClick={() => setCategoria('adolescentes')} 
          className={`px-8 py-3 rounded-full font-bold transition-all ${categoria === 'adolescentes' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-purple-600'}`}>
          Para Adolescentes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contenidoActividades[categoria].map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{item.icono}</div>
            <h3 className="text-xl font-bold mb-2 text-slate-800">{item.titulo}</h3>
            <p className="text-slate-600 mb-6">{item.desc}</p>
            <button 
              onClick={() => alert(`¡Genial! Vamos a empezar: ${item.titulo}`)}
              className="w-full bg-slate-900 text-white py-2 rounded-xl font-bold hover:bg-slate-700 transition-colors"
            >
              Comenzar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}