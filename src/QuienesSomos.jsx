import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Hook para animación al entrar en viewport
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Pilares institucionales
const pilares = [
  {
    icono: '🧠',
    titulo: 'Neurodiversidad',
    texto: 'Abrazamos las diferencias cognitivas como parte natural de la humanidad, no como limitaciones.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    icono: '🤝',
    titulo: 'Acompañamiento',
    texto: 'Caminamos junto a niños, familias y cuidadores en cada etapa de su desarrollo.',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
  },
  {
    icono: '⚖️',
    titulo: 'Equidad',
    texto: 'Las limitaciones económicas nunca deben ser una barrera para acceder a apoyos oportunos.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    icono: '🌱',
    titulo: 'Inclusión real',
    texto: 'Construimos entornos más accesibles, empáticos y justos para que cada persona pueda crecer con dignidad.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
];

// Áreas del equipo
const areas = [
  { nombre: 'Psicología', icono: '🧩' },
  { nombre: 'Fonoaudiología', icono: '🗣️' },
  { nombre: 'Terapia Ocupacional', icono: '🖐️' },
  { nombre: 'Kinesiología', icono: '🏃' },
  { nombre: 'Trabajo Social', icono: '🌐' },
];

export default function QuienesSomos() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-semibold mb-12 text-sm">
            ← Volver al inicio
          </Link>

          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">💜</span>
            <div>
              <p className="text-violet-400 font-bold tracking-widest text-xs uppercase mb-2">Organización sin fines de lucro</p>
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Fundación<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
                  Nexus Inclusiva
                </span>
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-xl max-w-2xl leading-relaxed mt-6">
            Trabajamos para mejorar la calidad de vida de niños, niñas y adolescentes
            neurodivergentes y en situación de discapacidad, y de las familias que los acompañan.
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['Salud especializada', 'Rehabilitación', 'Acompañamiento integral', 'Equipo transdisciplinario'].map(tag => (
              <span key={tag} className="bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── NUESTRA HISTORIA ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <span className="text-violet-500 font-bold text-xs uppercase tracking-widest">¿Por qué existimos?</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight">
                Nacemos de una convicción
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-5">
                Todas las personas merecen acceso a apoyos oportunos, espacios inclusivos y oportunidades
                reales para desarrollar su máximo potencial.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Sin que las <strong className="text-slate-800">limitaciones económicas</strong> sean una barrera para ello.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Bloque visual de propósito */}
            <div className="bg-gradient-to-br from-violet-600 to-sky-600 rounded-3xl p-8 text-white shadow-2xl shadow-violet-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-black mb-3">Nuestro propósito</h3>
              <p className="text-white/90 leading-relaxed">
                Acercar servicios especializados de salud, rehabilitación y acompañamiento integral
                a quienes más lo necesitan, a través de un equipo transdisciplinario comprometido.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── PILARES ──────────────────────────────────────────────────── */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-violet-500 font-bold text-xs uppercase tracking-widest">Lo que nos mueve</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2">Nuestros pilares</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pilares.map((p, i) => (
              <FadeIn key={p.titulo} delay={i * 0.1}>
                <div className={`${p.bg} ${p.border} border-2 rounded-3xl p-6 h-full hover:shadow-lg transition-shadow`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md`}>
                    {p.icono}
                  </div>
                  <h3 className="font-black text-slate-800 text-lg mb-2">{p.titulo}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.texto}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── MÁS ALLÁ DE LAS TERAPIAS ─────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            {/* Bloque familia */}
            <div className="relative">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8">
                <div className="text-4xl mb-4">👨‍👩‍👧</div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">Las familias también importan</h3>
                <p className="text-slate-600 leading-relaxed">
                  Detrás de cada niño, niña o adolescente existe una familia que enfrenta desafíos cotidianos.
                  Especialmente quienes ejercen <strong className="text-slate-800">labores de cuidado</strong>.
                </p>
              </div>
              {/* Tag flotante */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg rotate-3">
                Más que terapias 💛
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">Nuestra misión ampliada</span>
              <h2 className="text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight">
                Entornos más estables y resilientes
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Promovemos iniciativas que fortalezcan la autonomía, el bienestar y las oportunidades
                de desarrollo de las personas cuidadoras, contribuyendo a acortar las
                <strong className="text-slate-800"> brechas de desigualdad social</strong>.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── EQUIPO TRANSDISCIPLINARIO ────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sky-400 font-bold text-xs uppercase tracking-widest">Quiénes nos conforman</span>
              <h2 className="text-4xl font-black mt-2">Equipo transdisciplinario</h2>
              <p className="text-slate-400 mt-3 text-lg max-w-xl mx-auto">
                Profesionales de distintas áreas trabajando juntos por un mismo propósito.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-4">
            {areas.map((a, i) => (
              <FadeIn key={a.nombre} delay={i * 0.08}>
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-6 py-4 text-center hover:bg-white/20 transition-colors">
                  <div className="text-3xl mb-2">{a.icono}</div>
                  <p className="font-bold text-sm text-white">{a.nombre}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── CREENCIA CENTRAL ─────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <FadeIn>
          <div className="relative">
            {/* Comillas decorativas */}
            <div className="text-8xl text-violet-100 font-black leading-none select-none mb-2">"</div>
            <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed -mt-8">
              La verdadera inclusión ocurre cuando apoyamos a las personas de manera integral,
              fortaleciendo tanto sus capacidades como las de su entorno.
            </p>
            <div className="mt-8 w-16 h-1.5 bg-gradient-to-r from-violet-500 to-sky-500 rounded-full mx-auto" />
            <p className="text-slate-500 font-semibold mt-4">Fundación Nexus Inclusiva</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16 bg-gradient-to-r from-violet-600 to-sky-600 rounded-3xl p-8 text-white text-left">
            <h3 className="text-2xl font-black mb-3">🌍 Nuestra visión de sociedad</h3>
            <p className="text-white/90 text-lg leading-relaxed">
              Trabajamos para construir una sociedad más <strong>accesible, empática y justa</strong>,
              donde cada persona pueda participar, crecer y desarrollarse con <strong>dignidad</strong>.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}