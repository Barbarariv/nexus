import React from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Saludo Principal */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-black text-blue-900">
          Bienvenido a <span className="text-blue-600">NEXUS</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Un espacio diseñado para el acompañamiento, la organización y el desarrollo de habilidades.
        </p>
      </section>

      {/* Tarjetas de Acceso Rápido */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Explorar Actividades</h2>
          <p className="text-slate-600 mb-6">Accede a herramientas sensoriales, gestión de rutinas y más.</p>
          <Link 
            to="/actividades" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            Ver Actividades
          </Link>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Mi Progreso</h2>
          <p className="text-slate-600 mb-6">Revisa tus logros, rutinas completadas y metas alcanzadas esta semana.</p>
          <button 
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-700 transition-colors"
            onClick={() => alert("Próximamente disponible")}
          >
            Ver Mi Perfil
          </button>
        </div>
      </section>

      {/* Sección Informativa Extra */}
      <section className="bg-sky-100 p-8 rounded-[2rem] text-center border-t-4 border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Consejo del día</h3>
        <p className="text-blue-800 italic">"Pequeños pasos constantes llevan a grandes cambios positivos."</p>
      </section>
    </div>
  );
  {/* Botón de WhatsApp */}
<div className="fixed bottom-8 right-8 z-50">
  <a 
    href="https://wa.me/56988094341" 
    target="_blank" 
    rel="noopener noreferrer"
    className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center text-2xl"
    aria-label="Chat en WhatsApp"
  >
    {/* Puedes usar un SVG aquí o un emoji */}
    💬
  </a>
</div>
}