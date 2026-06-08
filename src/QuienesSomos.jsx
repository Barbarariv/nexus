import React from 'react';
import { Link } from 'react-router-dom';

export default function QuienesSomos() {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-slate-50 min-h-screen">
      <Link to="/" className="text-blue-600 font-bold mb-8 block hover:underline">← Volver al inicio</Link>
      
      {/* Encabezado Principal */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-blue-900 mb-4">¿Quiénes somos?</h1>
        <p className="text-2xl text-blue-600 font-medium">Fundación Nexus Inclusiva</p>
      </div>

      {/* Misión y Visión */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Nuestra Esencia</h2>
          <p className="text-slate-700 leading-relaxed">
            Somos una organización sin fines de lucro dedicada a mejorar la calidad de vida de niños, niñas y adolescentes neurodivergentes y en situación de discapacidad. 
            Creemos firmemente en el acceso a apoyos oportunos, eliminando las barreras económicas para que todos puedan desarrollar su máximo potencial.
          </p>
        </div>

        <div className="bg-blue-600 p-8 rounded-[2rem] text-white">
          <h2 className="text-2xl font-bold mb-4">Más que Terapias</h2>
          <p className="leading-relaxed">
            Nuestro equipo transdisciplinario (psicología, fonoaudiología, terapia ocupacional, kinesiología y trabajo social) no solo acompaña al niño, 
            sino que abraza a toda la familia, fortaleciendo el bienestar de quienes ejercen labores de cuidado.
          </p>
        </div>
      </div>

      {/* Compromiso Social */}
      <div className="bg-white p-10 rounded-[2rem] shadow-lg border border-slate-100 text-center">
        <h3 className="text-3xl font-black text-slate-900 mb-6">Nuestro Propósito</h3>
        <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto italic">
          "La verdadera inclusión ocurre cuando apoyamos integralmente. Trabajamos para construir una sociedad más accesible, empática y justa, 
          donde cada persona pueda participar, crecer y desarrollarse con dignidad."
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <span className="px-6 py-2 bg-sky-100 text-blue-800 rounded-full font-bold">Autonomía</span>
          <span className="px-6 py-2 bg-sky-100 text-blue-800 rounded-full font-bold">Bienestar</span>
          <span className="px-6 py-2 bg-sky-100 text-blue-800 rounded-full font-bold">Equidad</span>
        </div>
      </div>
    </div>
  );
}