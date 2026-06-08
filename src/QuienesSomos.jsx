import React from 'react';
import { Link } from 'react-router-dom';

export default function QuienesSomos() {
  return (
    <div className="max-w-4xl mx-auto p-12 text-left">
      <Link to="/" className="text-blue-600 font-bold hover:underline mb-8 block">← Volver al inicio</Link>
      
      {/* Título que aparece en tu imagen */}
      <h1 className="text-5xl font-black text-slate-900 mb-8 border-b-4 border-blue-600 inline-block">
        ¿Quiénes somos?
      </h1>

      {/* Contenido */}
      <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
        <p>
          <strong>Fundación Nexus Inclusiva</strong> es una organización sin fines de lucro que trabaja para mejorar la calidad de vida de niños, niñas y adolescentes neurodivergentes y en situación de discapacidad, así como de las familias que los acompañan en su proceso de desarrollo.
        </p>
        <p>
          Nacemos convencidos de que todas las personas merecen acceso a apoyos oportunos, espacios inclusivos y oportunidades reales para desarrollar su máximo potencial, sin que las limitaciones económicas sean una barrera para ello.
        </p>
        <p>
          Nuestro propósito es acercar servicios especializados de salud, rehabilitación y acompañamiento integral a quienes más lo necesitan, a través de un equipo transdisciplinario conformado por profesionales de áreas como psicología, fonoaudiología, terapia ocupacional, kinesiología y trabajo social.
        </p>
      </div>
    </div>
  );
}