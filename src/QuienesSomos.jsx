import { Link } from 'react-router-dom';
import { Heart, Brain, HandHeart, Scale, Sprout, ArrowLeft } from 'lucide-react';

import carolinaVidal from './assets/equipo/carolina-vidal.png';
import matiasHerrera from './assets/equipo/matias-herrera.png';
import patriciaMunoz from './assets/equipo/patricia-munoz.png';
import robertoSalinas from './assets/equipo/roberto-salinas.png';

// --- Datos de los valores institucionales ---
const valores = [
  {
    titulo: 'Neurodiversidad',
    icon: Brain,
    color: 'bg-purple-50',
    iconBg: 'bg-purple-500',
    texto: 'Abrazamos las diferencias cognitivas como parte natural de la humanidad, sin verlas como limitaciones.',
  },
  {
    titulo: 'Acompañamiento',
    icon: HandHeart,
    color: 'bg-blue-50',
    iconBg: 'bg-blue-500',
    texto: 'Caminamos junto a niños, familias y cuidadores en cada etapa de su desarrollo.',
  },
  {
    titulo: 'Equidad',
    icon: Scale,
    color: 'bg-green-50',
    iconBg: 'bg-emerald-500',
    texto: 'Las limitaciones económicas nunca deben ser una barrera para acceder a apoyos oportunos.',
  },
  {
    titulo: 'Inclusión real',
    icon: Sprout,
    color: 'bg-amber-50',
    iconBg: 'bg-amber-500',
    texto: 'Construimos entornos más accesibles, empáticos y justos para que cada persona pueda crecer con dignidad.',
  },
];

// --- Equipo: cada integrante se asocia a un valor/acento de color de la fundación ---
const equipo = [
  {
    nombre: 'Jeanet Faúdez',
    rol: 'Tesorera',
    foto: matiasHerrera,
    acento: 'border-blue-400',
    chip: 'bg-blue-100 text-blue-700',
    frase: 'Conectar cada apoyo con la familia que lo necesita.',
  },
  {
    nombre: 'Joyce Vergara',
    rol: 'Fundadora y presidenta',
    foto: robertoSalinas,
    acento: 'border-amber-400',
    chip: 'bg-amber-100 text-amber-700',
    frase: 'Construir alianzas que sostengan a NEXO en el tiempo.',
  },
  {
    nombre: 'Andres Vergara',
    rol: 'Secretario',
    foto: carolinaVidal,
    acento: 'border-emerald-400',
    chip: 'bg-emerald-100 text-emerald-700',
    frase: 'Diseñar actividades que respeten el ritmo de cada niño o niña.',
  },
  {
    nombre: 'Rodolfo Peime',
    rol: 'Vicepresidente',
    foto: patriciaMunoz,
    acento: 'border-purple-400',
    chip: 'bg-purple-100 text-purple-700',
    frase: 'Contar nuestras historias para que más familias se acerquen.',
  },
];

export default function SobreNosotros() {
  return (
    <div className="font-sans">

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-slate-950 text-white px-6 md:px-12 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-blue-950 opacity-90" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-10 text-sm font-semibold">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <div className="flex justify-center mb-6">
            <Heart className="text-purple-400" size={36} />
          </div>

          <p className="uppercase tracking-[0.2em] text-purple-300 text-xs font-bold mb-4">
            Organización sin fines de lucro
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Fundación <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Nexus Inclusiva</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Trabajamos para mejorar la calidad de vida de niños, niñas y adolescentes
            neurodivergentes y en situación de discapacidad, y de las familias que los acompañan.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['Salud especializada', 'Rehabilitación', 'Acompañamiento integral', 'Equipo transdisciplinario'].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- VALORES ---------- */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">Lo que nos guía</h2>
        <p className="text-center text-slate-500 mb-12">Cuatro ideas que sostienen todo lo que hacemos en NEXO.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map(v => (
            <div key={v.titulo} className={`${v.color} rounded-3xl p-6 border border-white shadow-sm`}>
              <div className={`${v.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                <v.icon className="text-white" size={22} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">{v.titulo}</h3>
              <p className="text-sm text-slate-600">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- EQUIPO ---------- */}
      <section className="px-6 md:px-12 py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-4">
            <span className="inline-block h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-900 via-orange-400 to-amber-300" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-900">
            Las personas detrás de NEXUS
          </h2>
          <p className="text-center text-slate-500 max-w-xl mx-auto mb-16">
            Cada integrante del equipo sostiene un valor de la fundación: así es como
            se conectan las distintas formas de acompañar a nuestras familias.
          </p>

          {/* Tarjetas conectadas por una línea, como una pequeña red de apoyo */}
          <div className="relative">
            {/* Línea conectora (solo en pantallas grandes) */}
            <div className="hidden lg:block absolute top-[68px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
              {equipo.map((persona) => (
                <div key={persona.nombre} className="flex flex-col items-center text-center">

                  {/* Nodo de la red + foto */}
                  <div className="relative mb-5">
                    <span className={`hidden lg:block absolute -top-[44px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${persona.chip} ring-4 ring-sky-50`} />
                    <div className={`w-28 h-28 rounded-full overflow-hidden border-4 ${persona.acento} shadow-md bg-white`}>
                      <img src={persona.foto} alt={persona.nombre} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900">{persona.nombre}</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full mt-2 mb-3 ${persona.chip}`}>
                    {persona.rol}
                  </span>
                  <p className="text-sm text-slate-500 italic">“{persona.frase}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CIERRE / CONTACTO ---------- */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-10 md:p-14 text-center text-white shadow-lg">
          <Heart className="mx-auto mb-4 text-blue-200" size={32} />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Aquí todos somos comprendidos, valorados y apoyados.
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Un espacio seguro, inclusivo y lleno de oportunidades para crecer junto a tu familia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="bg-white text-blue-800 font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors">
              Para familias
            </Link>
            <Link to="/recursos" className="bg-white/10 border border-white/30 font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              Para educadores
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
