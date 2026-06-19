import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── AUDIO ──────────────────────────────────────────────────────────────────────
function sonidoClic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.frequency.value = 600; osc.type = 'sine';
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(); osc.stop(ctx.currentTime + 0.12);
  } catch(e) {}
}
function sonidoExito() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.frequency.value = freq; osc.type = 'sine';
      g.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.13);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.13 + 0.25);
      osc.start(ctx.currentTime + i * 0.13);
      osc.stop(ctx.currentTime + i * 0.13 + 0.25);
    });
  } catch(e) {}
}
function hablar(texto) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'es-CL'; u.rate = 0.88; u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

// ── EMOJIS DE ÍCONOS ──────────────────────────────────────────────────────────
const ICONOS = ['🌅','🌙','🍎','🪥','👕','📚','🏃','🎨','🎮','🛁','😴','💊','🧘','🎵','📖','🌿','💧','🍽️','🧹','🐾'];
const COLORES = [
  'from-violet-400 to-purple-500',
  'from-blue-400 to-cyan-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-400',
  'from-pink-400 to-rose-500',
  'from-indigo-400 to-blue-500',
  'from-green-400 to-emerald-500',
  'from-orange-400 to-red-400',
];

// ── CONFETI ────────────────────────────────────────────────────────────────────
function Confeti() {
  const piezas = ['🎉','⭐','✨','🌟','💫','🎊'];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({length: 18}).map((_, i) => (
        <span key={i} className="absolute text-2xl animate-bounce"
          style={{
            left: `${Math.random()*100}%`,
            top: `${Math.random()*60}%`,
            animationDelay: `${Math.random()*0.8}s`,
            animationDuration: `${0.6+Math.random()*0.6}s`,
            opacity: 0.85,
          }}>
          {piezas[Math.floor(Math.random()*piezas.length)]}
        </span>
      ))}
    </div>
  );
}

// ── CONSTANTES ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'nexus_rutinas';
const PASOS_PREDEF = {
  manana: [
    { nombre: 'Despertar y estirarse', icono: '🌅' },
    { nombre: 'Cepillar los dientes', icono: '🪥' },
    { nombre: 'Desayunar', icono: '🍎' },
    { nombre: 'Vestirse', icono: '👕' },
    { nombre: 'Preparar la mochila', icono: '📚' },
  ],
  tarde: [
    { nombre: 'Llegar a casa', icono: '🏠' },
    { nombre: 'Lavarse las manos', icono: '💧' },
    { nombre: 'Almorzar', icono: '🍽️' },
    { nombre: 'Tiempo libre', icono: '🎮' },
    { nombre: 'Hacer tareas', icono: '📖' },
  ],
  noche: [
    { nombre: 'Cenar', icono: '🍽️' },
    { nombre: 'Bañarse', icono: '🛁' },
    { nombre: 'Cepillar los dientes', icono: '🪥' },
    { nombre: 'Leer un cuento', icono: '📖' },
    { nombre: 'Dormir', icono: '😴' },
  ],
};

// ── MODAL PARA CREAR/EDITAR RUTINA ────────────────────────────────────────────
function ModalRutina({ rutina, onGuardar, onCerrar }) {
  const [nombre, setNombre]   = useState(rutina?.nombre || '');
  const [icono, setIcono]     = useState(rutina?.icono || '🌅');
  const [color, setColor]     = useState(rutina?.color || COLORES[0]);
  const [pasos, setPasos]     = useState(rutina?.pasos || []);
  const [nuevoPaso, setNuevoPaso] = useState('');
  const [iconoPaso, setIconoPaso] = useState('📌');
  const [mostrarIconos, setMostrarIconos] = useState(false);
  const [mostrarIconosPaso, setMostrarIconosPaso] = useState(false);
  const [plantilla, setPlantilla] = useState('');

  function agregarPaso() {
    if (!nuevoPaso.trim()) return;
    sonidoClic();
    setPasos(prev => [...prev, { nombre: nuevoPaso.trim(), icono: iconoPaso, hecho: false }]);
    setNuevoPaso(''); setIconoPaso('📌');
  }
  function eliminarPaso(i) {
    sonidoClic();
    setPasos(prev => prev.filter((_, idx) => idx !== i));
  }
  function moverPaso(i, dir) {
    const arr = [...pasos];
    const dest = i + dir;
    if (dest < 0 || dest >= arr.length) return;
    [arr[i], arr[dest]] = [arr[dest], arr[i]];
    setPasos(arr);
  }
  function aplicarPlantilla(tipo) {
    setPlantilla(tipo);
    setPasos(PASOS_PREDEF[tipo].map(p => ({ ...p, hecho: false })));
  }
  function guardar() {
    if (!nombre.trim() || pasos.length === 0) return;
    onGuardar({ id: rutina?.id || Date.now(), nombre: nombre.trim(), icono, color, pasos });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className={`bg-gradient-to-r ${color} p-6 rounded-t-3xl`}>
          <div className="flex justify-between items-center">
            <h2 className="text-white font-black text-xl">
              {rutina ? 'Editar rutina' : 'Nueva rutina'}
            </h2>
            <button onClick={onCerrar} className="text-white/80 hover:text-white text-2xl font-bold">✕</button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Nombre e ícono */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-1 block">Nombre de la rutina</label>
            <div className="flex gap-2">
              <button onClick={() => setMostrarIconos(!mostrarIconos)}
                className="text-2xl bg-slate-100 rounded-xl px-3 py-2 hover:bg-slate-200 transition-colors">
                {icono}
              </button>
              <input value={nombre} onChange={e => setNombre(e.target.value)}
                placeholder="Ej: Mi rutina de mañana"
                className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-2 font-semibold focus:border-purple-400 focus:outline-none" />
            </div>
            {mostrarIconos && (
              <div className="mt-2 grid grid-cols-10 gap-1 p-3 bg-slate-50 rounded-2xl">
                {ICONOS.map(e => (
                  <button key={e} onClick={() => { setIcono(e); setMostrarIconos(false); }}
                    className="text-xl hover:scale-125 transition-transform p-1">{e}</button>
                ))}
              </div>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-2 block">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORES.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${c} transition-transform ${color===c ? 'scale-125 ring-2 ring-offset-1 ring-purple-400' : 'hover:scale-110'}`} />
              ))}
            </div>
          </div>

          {/* Plantillas */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-2 block">¿Quieres usar una plantilla?</label>
            <div className="flex gap-2">
              {[{k:'manana',l:'🌅 Mañana'},{k:'tarde',l:'🌤 Tarde'},{k:'noche',l:'🌙 Noche'}].map(({k,l}) => (
                <button key={k} onClick={() => aplicarPlantilla(k)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border-2 transition-colors
                    ${plantilla===k ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-slate-200 hover:border-purple-200 text-slate-600'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Pasos */}
          <div>
            <label className="text-sm font-bold text-slate-600 mb-2 block">Pasos de la rutina ({pasos.length})</label>
            <div className="space-y-2 mb-3 max-h-44 overflow-y-auto pr-1">
              {pasos.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                  <span className="text-lg">{p.icono}</span>
                  <span className="flex-1 text-sm font-semibold text-slate-700">{p.nombre}</span>
                  <button onClick={() => moverPaso(i, -1)} disabled={i===0}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-20 text-xs font-bold">▲</button>
                  <button onClick={() => moverPaso(i, 1)} disabled={i===pasos.length-1}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-20 text-xs font-bold">▼</button>
                  <button onClick={() => eliminarPaso(i)}
                    className="text-rose-400 hover:text-rose-600 font-bold text-sm">✕</button>
                </div>
              ))}
              {pasos.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-3">Aún no hay pasos. ¡Agrega el primero!</p>
              )}
            </div>

            {/* Agregar paso */}
            <div className="flex gap-2">
              <button onClick={() => setMostrarIconosPaso(!mostrarIconosPaso)}
                className="text-xl bg-slate-100 rounded-xl px-3 py-2 hover:bg-slate-200 transition-colors">
                {iconoPaso}
              </button>
              <input value={nuevoPaso} onChange={e => setNuevoPaso(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && agregarPaso()}
                placeholder="Agregar un paso..."
                className="flex-1 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold focus:border-purple-400 focus:outline-none" />
              <button onClick={agregarPaso}
                className="bg-purple-500 hover:bg-purple-600 text-white font-black px-4 rounded-xl transition-colors">+</button>
            </div>
            {mostrarIconosPaso && (
              <div className="mt-2 grid grid-cols-10 gap-1 p-3 bg-slate-50 rounded-2xl">
                {ICONOS.map(e => (
                  <button key={e} onClick={() => { setIconoPaso(e); setMostrarIconosPaso(false); }}
                    className="text-xl hover:scale-125 transition-transform p-1">{e}</button>
                ))}
              </div>
            )}
          </div>

          {/* Botón guardar */}
          <button onClick={guardar}
            disabled={!nombre.trim() || pasos.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 disabled:opacity-40
              text-white font-black py-3 rounded-2xl hover:from-purple-600 hover:to-indigo-600
              transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-200">
            {rutina ? '💾 Guardar cambios' : '✨ Crear rutina'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── VISTA DE EJECUCIÓN DE RUTINA ───────────────────────────────────────────────
function EjecutarRutina({ rutina, onVolver, onActualizar }) {
  const [pasos, setPasos] = useState(rutina.pasos.map(p => ({ ...p, hecho: false })));
  const [celebrar, setCelebrar] = useState(false);

  const hechos  = pasos.filter(p => p.hecho).length;
  const pct     = Math.round((hechos / pasos.length) * 100);
  const completa = hechos === pasos.length;

  function togglePaso(i) {
    sonidoClic();
    const arr = [...pasos];
    arr[i].hecho = !arr[i].hecho;
    setPasos(arr);
    const nuevosHechos = arr.filter(p => p.hecho).length;
    hablar(arr[i].hecho ? `¡Muy bien! ${arr[i].nombre}` : arr[i].nombre);
    if (nuevosHechos === arr.length) {
      sonidoExito();
      setCelebrar(true);
      hablar('¡Felicitaciones! ¡Completaste toda la rutina!');
      setTimeout(() => setCelebrar(false), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {celebrar && <Confeti />}

      {/* Header */}
      <div className={`bg-gradient-to-r ${rutina.color} px-6 py-8`}>
        <button onClick={onVolver}
          className="flex items-center gap-2 text-white/80 hover:text-white font-bold mb-4 text-sm">
          ← Volver
        </button>
        <div className="text-5xl mb-2">{rutina.icono}</div>
        <h1 className="text-white font-black text-2xl">{rutina.nombre}</h1>
        <p className="text-white/80 text-sm mt-1">{hechos} de {pasos.length} pasos completados</p>

        {/* Barra de progreso */}
        <div className="mt-4 bg-white/20 rounded-full h-3">
          <div className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Pasos */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
        {pasos.map((paso, i) => (
          <button key={i} onClick={() => togglePaso(i)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left
              transition-all duration-300 hover:scale-[1.01]
              ${paso.hecho
                ? 'bg-green-50 border-green-300 shadow-sm'
                : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'}`}>

            {/* Checkbox visual */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm transition-all
              ${paso.hecho ? 'bg-green-500 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}>
              {paso.hecho ? '✓' : i + 1}
            </div>

            <span className="text-2xl">{paso.icono}</span>
            <span className={`font-bold text-base flex-1 ${paso.hecho ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {paso.nombre}
            </span>
            {paso.hecho && <span className="text-green-500 text-lg">⭐</span>}
          </button>
        ))}
      </div>

      {/* Banner de completado */}
      {completa && (
        <div className={`mx-4 mb-6 bg-gradient-to-r ${rutina.color} rounded-3xl p-6 text-center text-white shadow-xl`}>
          <div className="text-5xl mb-2">🏆</div>
          <h2 className="font-black text-xl mb-1">¡Rutina completada!</h2>
          <p className="text-white/90 text-sm">¡Lo hiciste increíble! Todos los pasos listos 🎉</p>
          <button onClick={onVolver}
            className="mt-4 bg-white/20 hover:bg-white/30 font-bold px-6 py-2 rounded-full transition-colors">
            Volver a mis rutinas
          </button>
        </div>
      )}
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ───────────────────────────────────────────────────────
export default function Rutinas() {
  const [rutinas, setRutinas]       = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  const [modalAbierto, setModal]    = useState(false);
  const [editando, setEditando]     = useState(null);
  const [ejecutando, setEjecutando] = useState(null);
  const [confirmElim, setConfirmElim] = useState(null);

  // Persistir en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rutinas));
  }, [rutinas]);

  function guardarRutina(r) {
    sonidoExito();
    if (editando) {
      setRutinas(prev => prev.map(x => x.id === r.id ? r : x));
    } else {
      setRutinas(prev => [...prev, r]);
    }
    setModal(false); setEditando(null);
  }

  function eliminarRutina(id) {
    sonidoClic();
    setRutinas(prev => prev.filter(r => r.id !== id));
    setConfirmElim(null);
  }

  // Vista de ejecución
  if (ejecutando) {
    return (
      <EjecutarRutina
        rutina={ejecutando}
        onVolver={() => setEjecutando(null)}
        onActualizar={(r) => setRutinas(prev => prev.map(x => x.id === r.id ? r : x))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Modal */}
      {modalAbierto && (
        <ModalRutina
          rutina={editando}
          onGuardar={guardarRutina}
          onCerrar={() => { setModal(false); setEditando(null); }}
        />
      )}

      {/* Confirm eliminar */}
      {confirmElim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-black text-slate-900 text-lg mb-2">¿Eliminar rutina?</h3>
            <p className="text-slate-500 text-sm mb-5">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmElim(null)}
                className="flex-1 border-2 border-slate-200 rounded-2xl py-2 font-bold text-slate-600 hover:bg-slate-50">
                Cancelar
              </button>
              <button onClick={() => eliminarRutina(confirmElim)}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl py-2 font-bold">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 px-6 md:px-12 pt-8 pb-16">
        <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm font-bold mb-6">
          ← Inicio
        </Link>
        <div className="max-w-2xl">
          <div className="text-5xl mb-3">📅</div>
          <h1 className="text-white font-black text-3xl md:text-4xl mb-2">Mis Rutinas</h1>
          <p className="text-white/80 text-base">
            Crea tus propias rutinas diarias, agrega los pasos que necesitas y ¡márcalos cuando los completes!
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 pb-16">

        {/* Botón crear */}
        <button
          onClick={() => { sonidoClic(); setEditando(null); setModal(true); }}
          className="w-full bg-white rounded-3xl border-2 border-dashed border-purple-300
            hover:border-purple-500 hover:bg-purple-50 transition-all p-5 flex items-center
            justify-center gap-3 group shadow-sm mb-6">
          <span className="text-3xl group-hover:scale-110 transition-transform">➕</span>
          <span className="font-black text-purple-600 text-lg">Crear nueva rutina</span>
        </button>

        {/* Lista de rutinas */}
        {rutinas.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌈</div>
            <h3 className="font-black text-slate-700 text-xl mb-2">¡Aún no tienes rutinas!</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Crea tu primera rutina con el botón de arriba. Puedes usar una plantilla de mañana, tarde o noche.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rutinas.map(r => {
              const hechos = r.pasos.filter(p => p.hecho).length;
              const pct    = r.pasos.length ? Math.round((hechos / r.pasos.length) * 100) : 0;
              return (
                <div key={r.id}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">

                  {/* Header de la tarjeta */}
                  <div className={`bg-gradient-to-r ${r.color} p-5`}>
                    <div className="flex justify-between items-start">
                      <span className="text-4xl">{r.icono}</span>
                      <div className="flex gap-1">
                        <button onClick={() => { sonidoClic(); setEditando(r); setModal(true); }}
                          className="bg-white/20 hover:bg-white/40 text-white text-xs font-bold px-2 py-1 rounded-lg transition-colors">
                          ✏️
                        </button>
                        <button onClick={() => { sonidoClic(); setConfirmElim(r.id); }}
                          className="bg-white/20 hover:bg-red-400 text-white text-xs font-bold px-2 py-1 rounded-lg transition-colors">
                          🗑️
                        </button>
                      </div>
                    </div>
                    <h3 className="text-white font-black text-lg mt-2">{r.nombre}</h3>
                    <p className="text-white/80 text-xs mt-1">{r.pasos.length} pasos · {hechos} completados</p>
                  </div>

                  {/* Barra de progreso */}
                  <div className="px-5 pt-4">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>Progreso</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="bg-slate-100 rounded-full h-2">
                      <div className={`bg-gradient-to-r ${r.color} rounded-full h-2 transition-all duration-500`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  {/* Pasos preview */}
                  <div className="px-5 py-3 space-y-1">
                    {r.pasos.slice(0, 3).map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs
                          ${p.hecho ? 'bg-green-400 text-white' : 'bg-slate-200'}`}>
                          {p.hecho ? '✓' : ''}
                        </span>
                        <span className="text-base">{p.icono}</span>
                        <span className={`truncate ${p.hecho ? 'line-through text-slate-400' : 'text-slate-700 font-semibold'}`}>
                          {p.nombre}
                        </span>
                      </div>
                    ))}
                    {r.pasos.length > 3 && (
                      <p className="text-xs text-slate-400 pl-6">+{r.pasos.length - 3} pasos más...</p>
                    )}
                  </div>

                  {/* Botón iniciar */}
                  <div className="px-5 pb-5">
                    <button onClick={() => { sonidoClic(); hablar(`Iniciando rutina ${r.nombre}`); setEjecutando(r); }}
                      className={`w-full bg-gradient-to-r ${r.color} text-white font-black py-3 rounded-2xl
                        hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 shadow-md mt-2`}>
                      {pct === 100 ? '🏆 ¡Completada! Repetir' : '▶ Iniciar rutina'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

