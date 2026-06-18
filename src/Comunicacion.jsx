import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── AUDIO ──────────────────────────────────────────────────────────────────────
function sonidoClic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.frequency.value = 520; osc.type = 'sine';
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
}
function sonidoCorazon() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [440, 550].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      g.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.2);
    });
  } catch(e) {}
}

// ── STORAGE KEY ────────────────────────────────────────────────────────────────
const KEY = 'nexus_comunicacion';

// ── HISTORIAS INICIALES DE EJEMPLO ────────────────────────────────────────────
const HISTORIAS_INICIALES = [
  {
    id: 1,
    autor: 'Mamá de Valentina, 8 años',
    avatar: '👩',
    categoria: 'familia',
    titulo: 'Por fin encontramos nuestro lugar',
    texto: 'Durante años busqué un espacio donde mi hija se sintiera comprendida. Valentina tiene TDAH y era muy difícil explicarle a la gente por qué a veces necesita moverse, gritar o simplemente no estar quieta. Desde que llegamos a NEXO, ella misma dice "aquí me entienden". Eso lo es todo para mí como mamá.',
    fecha: '2026-06-01',
    likes: 24,
    comentarios: [
      { id: 101, autor: 'Papá de Mateo', avatar: '👨', texto: '¡Nos pasa exactamente lo mismo! Gracias por compartirlo.', fecha: '2026-06-02', likes: 5 },
    ],
  },
  {
    id: 2,
    autor: 'Sebastián, 16 años',
    avatar: '🧑',
    categoria: 'joven',
    titulo: 'Aprendí que ser diferente no es un defecto',
    texto: 'Soy autista de alto funcionamiento y toda mi vida pensé que algo estaba mal conmigo. En el colegio me costaba hacer amigos y no entendía por qué. Las actividades de NEXO me ayudaron a conocerme mejor y a entender cómo funciona mi cerebro. Ahora lo veo como una fortaleza, no como un problema.',
    fecha: '2026-06-05',
    likes: 31,
    comentarios: [
      { id: 201, autor: 'Sofía, 15 años', avatar: '👧', texto: 'Gracias Sebastián, me identifico mucho contigo 💙', fecha: '2026-06-06', likes: 8 },
      { id: 202, autor: 'Educadora diferencial', avatar: '👩‍🏫', texto: 'Qué valiente compartir esto. Tu historia ayuda a muchos.', fecha: '2026-06-07', likes: 12 },
    ],
  },
  {
    id: 3,
    autor: 'Educadora diferencial, Escuela Los Pinos',
    avatar: '👩‍🏫',
    categoria: 'educador',
    titulo: 'Cómo NEXO transformó mi sala de clases',
    texto: 'Trabajo con niños y niñas neurodivergentes hace 10 años. Lo que más me costaba era encontrar materiales accesibles y actividades que realmente se adaptaran a cada ritmo. Empecé a usar los recursos de NEXO con mis estudiantes y la diferencia fue inmediata: más participación, menos angustia y sobre todo, más alegría. Ojalá más docentes conocieran este espacio.',
    fecha: '2026-06-10',
    likes: 18,
    comentarios: [],
  },
  {
    id: 4,
    autor: 'Abuela de Emilio, 7 años',
    avatar: '👵',
    categoria: 'familia',
    titulo: 'Nunca es tarde para aprender a acompañar',
    texto: 'Cuando mi nieto fue diagnosticado, yo no entendía nada. En mi época no se hablaba de esto. Pero empecé a leer los recursos de NEXO para familias y me di cuenta de que el amor no es suficiente si no viene acompañado de comprensión. Hoy soy la abuela que Emilio necesita, y eso me llena el corazón.',
    fecha: '2026-06-12',
    likes: 42,
    comentarios: [
      { id: 401, autor: 'Mamá de Lucas', avatar: '👩', texto: 'Esto me hizo llorar de emoción. ¡Qué hermosa historia! 💛', fecha: '2026-06-13', likes: 15 },
    ],
  },
];

// ── CATEGORÍAS ─────────────────────────────────────────────────────────────────
const CATEGORIAS = [
  { valor: 'todos',    label: 'Todas las historias', emoji: '🌟' },
  { valor: 'familia',  label: 'Familias',            emoji: '👨‍👩‍👧' },
  { valor: 'joven',    label: 'Niños y jóvenes',     emoji: '🧒' },
  { valor: 'educador', label: 'Educadores',           emoji: '👩‍🏫' },
];

const CATEGORIA_COLORES = {
  familia:  'bg-blue-100 text-blue-700',
  joven:    'bg-emerald-100 text-emerald-700',
  educador: 'bg-amber-100 text-amber-700',
};

// ── UTILIDADES ─────────────────────────────────────────────────────────────────
function formatFecha(iso) {
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ── MODAL NUEVA HISTORIA ───────────────────────────────────────────────────────
const AVATARES = ['👩','👨','👧','🧑','👵','👴','👩‍🏫','👨‍🏫','👩‍⚕️','🧒'];

function ModalHistoria({ onGuardar, onCerrar }) {
  const [autor,     setAutor]     = useState('');
  const [avatar,    setAvatar]    = useState('👩');
  const [categoria, setCategoria] = useState('familia');
  const [titulo,    setTitulo]    = useState('');
  const [texto,     setTexto]     = useState('');
  const [mostrarAv, setMostrarAv] = useState(false);
  const [enviado,   setEnviado]   = useState(false);

  function guardar() {
    if (!autor.trim() || !titulo.trim() || !texto.trim()) return;
    onGuardar({
      id: Date.now(),
      autor: autor.trim(),
      avatar,
      categoria,
      titulo: titulo.trim(),
      texto: texto.trim(),
      fecha: new Date().toISOString().split('T')[0],
      likes: 0,
      comentarios: [],
    });
    setEnviado(true);
    setTimeout(onCerrar, 1800);
  }

  if (enviado) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
        <div className="text-6xl mb-3">🎉</div>
        <h3 className="font-black text-slate-900 text-xl mb-1">¡Historia compartida!</h3>
        <p className="text-slate-500 text-sm">Gracias por ser parte de la comunidad NEXO.</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-white font-black text-xl">Compartir mi historia</h2>
          <button onClick={onCerrar} className="text-white/80 hover:text-white text-2xl font-bold">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar y nombre */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-1 block">¿Quién eres?</label>
            <div className="flex gap-2">
              <button onClick={() => setMostrarAv(!mostrarAv)}
                className="text-2xl bg-slate-100 rounded-xl px-3 py-2 hover:bg-slate-200 transition-colors">
                {avatar}
              </button>
              <input value={autor} onChange={e => setAutor(e.target.value)}
                placeholder="Ej: Mamá de Sofía, 9 años"
                className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-2 font-semibold focus:border-pink-400 focus:outline-none text-sm" />
            </div>
            {mostrarAv && (
              <div className="mt-2 flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl">
                {AVATARES.map(a => (
                  <button key={a} onClick={() => { setAvatar(a); setMostrarAv(false); }}
                    className="text-2xl hover:scale-125 transition-transform">{a}</button>
                ))}
              </div>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-2 block">Soy...</label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIAS.filter(c => c.valor !== 'todos').map(c => (
                <button key={c.valor} onClick={() => setCategoria(c.valor)}
                  className={`text-sm font-bold px-4 py-2 rounded-xl border-2 transition-colors
                    ${categoria === c.valor ? 'border-pink-400 bg-pink-50 text-pink-700' : 'border-slate-200 text-slate-600 hover:border-pink-200'}`}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-1 block">Título de tu historia</label>
            <input value={titulo} onChange={e => setTitulo(e.target.value)}
              placeholder="Ej: Cómo encontramos nuestro camino"
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 font-semibold focus:border-pink-400 focus:outline-none text-sm" />
          </div>

          {/* Texto */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-1 block">Cuéntanos tu historia</label>
            <textarea value={texto} onChange={e => setTexto(e.target.value)} rows={5}
              placeholder="Comparte tu experiencia con la comunidad NEXO..."
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 font-semibold focus:border-pink-400 focus:outline-none text-sm resize-none" />
            <p className="text-xs text-slate-400 mt-1 text-right">{texto.length} caracteres</p>
          </div>

          <button onClick={guardar}
            disabled={!autor.trim() || !titulo.trim() || !texto.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-40
              text-white font-black py-3 rounded-2xl hover:from-pink-600 hover:to-rose-600
              transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-200">
            💛 Compartir historia
          </button>
        </div>
      </div>
    </div>
  );
}

// ── VISTA DETALLE HISTORIA ─────────────────────────────────────────────────────
function DetalleHistoria({ historia, onVolver, onLike, onLikeComentario, onAgregarComentario }) {
  const [comentario, setComentario] = useState('');
  const [autorCom,   setAutorCom]   = useState('');
  const [avatarCom,  setAvatarCom]  = useState('👤');
  const [mostrarAv,  setMostrarAv]  = useState(false);
  const [likeado,    setLikeado]    = useState(false);
  const [likeadosCom, setLikeadosCom] = useState({});

  function enviarComentario() {
    if (!comentario.trim() || !autorCom.trim()) return;
    sonidoClic();
    onAgregarComentario(historia.id, {
      id: Date.now(),
      autor: autorCom.trim(),
      avatar: avatarCom,
      texto: comentario.trim(),
      fecha: new Date().toISOString().split('T')[0],
      likes: 0,
    });
    setComentario(''); setAutorCom('');
  }

  function handleLike() {
    if (likeado) return;
    sonidoCorazon();
    setLikeado(true);
    onLike(historia.id);
  }

  function handleLikeCom(cId) {
    if (likeadosCom[cId]) return;
    sonidoCorazon();
    setLikeadosCom(prev => ({ ...prev, [cId]: true }));
    onLikeComentario(historia.id, cId);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 px-6 py-8">
        <button onClick={onVolver}
          className="flex items-center gap-2 text-white/80 hover:text-white font-bold mb-6 text-sm">
          ← Volver
        </button>
        <span className={`text-xs font-black px-3 py-1 rounded-full bg-white/20 text-white mb-3 inline-block`}>
          {CATEGORIAS.find(c => c.valor === historia.categoria)?.emoji} {CATEGORIAS.find(c => c.valor === historia.categoria)?.label}
        </span>
        <h1 className="text-white font-black text-2xl md:text-3xl leading-tight mb-3">{historia.titulo}</h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{historia.avatar}</span>
          <div>
            <p className="text-white font-bold text-sm">{historia.autor}</p>
            <p className="text-white/70 text-xs">{formatFecha(historia.fecha)}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Texto */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-base">{historia.texto}</p>

          {/* Like */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
            <button onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all
                ${likeado ? 'bg-pink-500 text-white scale-105' : 'bg-slate-100 text-slate-600 hover:bg-pink-50 hover:text-pink-600'}`}>
              {likeado ? '❤️' : '🤍'} {historia.likes + (likeado ? 1 : 0)} me gusta
            </button>
            <span className="text-slate-400 text-sm">💬 {historia.comentarios.length} comentarios</span>
          </div>
        </div>

        {/* Comentarios */}
        <div>
          <h3 className="font-black text-slate-800 text-lg mb-4">
            Comentarios ({historia.comentarios.length})
          </h3>

          <div className="space-y-3 mb-5">
            {historia.comentarios.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4 bg-white rounded-2xl">
                Sé el primero en comentar esta historia 💬
              </p>
            )}
            {historia.comentarios.map(c => (
              <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{c.avatar}</span>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{c.autor}</p>
                    <p className="text-xs text-slate-400">{formatFecha(c.fecha)}</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{c.texto}</p>
                <button onClick={() => handleLikeCom(c.id)}
                  className={`mt-2 text-xs font-bold flex items-center gap-1 transition-colors
                    ${likeadosCom[c.id] ? 'text-pink-500' : 'text-slate-400 hover:text-pink-400'}`}>
                  {likeadosCom[c.id] ? '❤️' : '🤍'} {c.likes + (likeadosCom[c.id] ? 1 : 0)}
                </button>
              </div>
            ))}
          </div>

          {/* Agregar comentario */}
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h4 className="font-black text-slate-800 mb-3 text-sm">Deja tu comentario</h4>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setMostrarAv(!mostrarAv)}
                className="text-xl bg-slate-100 rounded-xl px-3 py-2 hover:bg-slate-200 transition-colors">
                {avatarCom}
              </button>
              <input value={autorCom} onChange={e => setAutorCom(e.target.value)}
                placeholder="Tu nombre o quién eres..."
                className="flex-1 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:border-pink-400 focus:outline-none" />
            </div>
            {mostrarAv && (
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl mb-3">
                {AVATARES.map(a => (
                  <button key={a} onClick={() => { setAvatarCom(a); setMostrarAv(false); }}
                    className="text-2xl hover:scale-125 transition-transform">{a}</button>
                ))}
              </div>
            )}
            <textarea value={comentario} onChange={e => setComentario(e.target.value)} rows={3}
              placeholder="Escribe tu comentario..."
              className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:border-pink-400 focus:outline-none resize-none mb-3" />
            <button onClick={enviarComentario}
              disabled={!comentario.trim() || !autorCom.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 disabled:opacity-40
                text-white font-black py-2 rounded-xl hover:from-pink-600 hover:to-rose-600
                transition-all active:scale-95">
              💬 Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────────
export default function Comunicacion() {
  const [historias,   setHistorias]   = useState(() => {
    const guardadas = localStorage.getItem(KEY);
    return guardadas ? JSON.parse(guardadas) : HISTORIAS_INICIALES;
  });
  const [categoriaActiva, setCategoria] = useState('todos');
  const [modalAbierto,    setModal]     = useState(false);
  const [detalle,         setDetalle]   = useState(null);
  const [busqueda,        setBusqueda]  = useState('');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(historias));
  }, [historias]);

  // Si hay historia en detalle, actualizarla al recibir cambios
  useEffect(() => {
    if (detalle) {
      const actualizada = historias.find(h => h.id === detalle.id);
      if (actualizada) setDetalle(actualizada);
    }
  }, [historias]);

  function agregarHistoria(h) {
    setHistorias(prev => [h, ...prev]);
  }

  function handleLike(hId) {
    setHistorias(prev => prev.map(h => h.id === hId ? { ...h, likes: h.likes + 1 } : h));
  }

  function handleLikeComentario(hId, cId) {
    setHistorias(prev => prev.map(h => h.id === hId
      ? { ...h, comentarios: h.comentarios.map(c => c.id === cId ? { ...c, likes: c.likes + 1 } : c) }
      : h));
  }

  function agregarComentario(hId, comentario) {
    setHistorias(prev => prev.map(h => h.id === hId
      ? { ...h, comentarios: [...h.comentarios, comentario] }
      : h));
  }

  const filtradas = historias
    .filter(h => categoriaActiva === 'todos' || h.categoria === categoriaActiva)
    .filter(h => !busqueda || h.titulo.toLowerCase().includes(busqueda.toLowerCase()) || h.texto.toLowerCase().includes(busqueda.toLowerCase()) || h.autor.toLowerCase().includes(busqueda.toLowerCase()));

  // Vista detalle
  if (detalle) return (
    <DetalleHistoria
      historia={detalle}
      onVolver={() => setDetalle(null)}
      onLike={handleLike}
      onLikeComentario={handleLikeComentario}
      onAgregarComentario={agregarComentario}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {modalAbierto && (
        <ModalHistoria
          onGuardar={(h) => { agregarHistoria(h); setModal(false); }}
          onCerrar={() => setModal(false)}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 px-6 md:px-12 pt-8 pb-20">
        <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm font-bold mb-6">
          ← Inicio
        </Link>
        <div className="max-w-2xl">
          <div className="text-5xl mb-3">💬</div>
          <h1 className="text-white font-black text-3xl md:text-4xl mb-2">Historias de nuestra comunidad</h1>
          <p className="text-white/80 text-base">
            Un espacio seguro para compartir experiencias, leer historias reales y saber que no estamos solos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-16">

        {/* Botón compartir */}
        <button onClick={() => { sonidoClic(); setModal(true); }}
          className="w-full bg-white rounded-3xl border-2 border-dashed border-pink-300
            hover:border-pink-500 hover:bg-pink-50 transition-all p-5 flex items-center
            justify-center gap-3 group shadow-sm mb-6">
          <span className="text-3xl group-hover:scale-110 transition-transform">✍️</span>
          <span className="font-black text-pink-600 text-lg">Compartir mi historia</span>
        </button>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-6 space-y-3">
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar historias..."
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-2 text-sm font-semibold focus:border-pink-400 focus:outline-none" />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map(c => (
              <button key={c.valor} onClick={() => { sonidoClic(); setCategoria(c.valor); }}
                className={`text-xs font-bold px-4 py-2 rounded-full border-2 transition-colors
                  ${categoriaActiva === c.valor
                    ? 'border-pink-400 bg-pink-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-pink-300'}`}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Historias', valor: historias.length, emoji: '📖' },
            { label: 'Comentarios', valor: historias.reduce((s, h) => s + h.comentarios.length, 0), emoji: '💬' },
            { label: 'Me gusta', valor: historias.reduce((s, h) => s + h.likes, 0), emoji: '❤️' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="font-black text-slate-900 text-xl">{stat.valor}</div>
              <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Historias */}
        {filtradas.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-slate-500 font-semibold">No encontramos historias con ese filtro.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtradas.map(h => (
              <div key={h.id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden">
                {/* Franja de color por categoría */}
                <div className={`h-1.5 w-full ${h.categoria === 'familia' ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : h.categoria === 'joven' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`} />

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${CATEGORIA_COLORES[h.categoria]}`}>
                      {CATEGORIAS.find(c => c.valor === h.categoria)?.emoji} {CATEGORIAS.find(c => c.valor === h.categoria)?.label}
                    </span>
                    <span className="text-xs text-slate-400">{formatFecha(h.fecha)}</span>
                  </div>

                  {/* Autor */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{h.avatar}</span>
                    <span className="font-bold text-sm text-slate-700">{h.autor}</span>
                  </div>

                  {/* Contenido */}
                  <h2 className="font-black text-slate-900 text-lg mb-2 leading-tight">{h.titulo}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{h.texto}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>🤍 {h.likes}</span>
                      <span>💬 {h.comentarios.length}</span>
                    </div>
                    <button onClick={() => { sonidoClic(); setDetalle(h); }}
                      className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold text-sm px-4 py-2 rounded-full transition-colors">
                      Leer historia →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
