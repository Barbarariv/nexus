import React from 'react';
import { Link } from 'react-router-dom';

export default function QuienesSomos() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-left">
      <Link to="/" className="text-blue-600 font-bold hover:underline mb-8 block">← Volver al inicio</Link>
      
      {/* Título con estilo */}
      <h1 className="text-5xl font-black mb-8 border-b-4 border-blue-600 inline-block pb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
  ¿Quiénes somos?
</h1>

      {/* Introducción principal */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
        <p className="text-xl text-slate-700 leading-relaxed">
          <strong>Fundación Nexus Inclusiva</strong> es una organización sin fines de lucro que trabaja para mejorar la calidad de vida de niños, niñas y adolescentes neurodivergentes y en situación de discapacidad, así como de las familias que los acompañan en su proceso de desarrollo.
        </p>
      </div>

      {/* Bloque con nuestra filosofía */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-600 p-8 rounded-3xl text-white">
          <h3 className="font-bold text-xl mb-4">Nuestra Convicción</h3>
          <p className="leading-relaxed">
            Nacemos convencidos de que todas las personas merecen acceso a apoyos oportunos y espacios inclusivos, sin que las limitaciones económicas sean una barrera.
          </p>
        </div>
        <div className="bg-slate-900 p-8 rounded-3xl text-white">
          <h3 className="font-bold text-xl mb-4">Nuestro Propósito</h3>
          <p className="leading-relaxed">
            Acercamos servicios especializados de salud y rehabilitación a través de un equipo transdisciplinario: psicología, fonoaudiología, terapia ocupacional, kinesiología y trabajo social.
          </p>
        </div>
      </div>

      {/* Misión familias y cierre */}
      <div className="space-y-6 text-slate-700 leading-relaxed bg-slate-50 p-8 rounded-3xl border border-slate-200">
        <p>
          Sin embargo, nuestra misión va más allá de las terapias. Comprendemos que detrás de cada niño, niña o adolescente existe una familia que enfrenta desafíos cotidianos. Por ello, promovemos iniciativas que fortalezcan la <strong>autonomía, el bienestar y las oportunidades de desarrollo de las personas cuidadoras</strong>.
        </p>
        <p className="italic text-lg font-semibold border-l-4 border-blue-600 pl-4 py-2">
          "En Fundación Nexus Inclusiva creemos que la verdadera inclusión ocurre cuando apoyamos integralmente. Trabajamos para construir una sociedad más accesible, empática y justa."
        </p>
      </div>
    </div>
  );
}