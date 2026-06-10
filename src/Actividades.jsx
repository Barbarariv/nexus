import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── AUDIO UTILS ───────────────────────────────────────────────────────────────
function hablar(texto) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'es-CL'; u.rate = 0.88; u.pitch = 1.15;
  window.speechSynthesis.speak(u);
}
function detenerVoz() { window.speechSynthesis?.cancel(); }

function sonidoExito() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notas = [523, 659, 784, 1047];
    notas.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch(e) {}
}

function sonidoClic() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 800; osc.type = 'sine';
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
}

// ── CONFETI ───────────────────────────────────────────────────────────────────
function Confeti() {
  const piezas = ['🌟','⭐','🎉','🎊','✨','💫','🌈','🏆'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({length: 18}).map((_, i) => (
        <div key={i} className="absolute text-2xl"
          style={{
            left: `${Math.random()*100}%`,
            top: '-10%',
            animation: `caer ${1.5 + Math.random()*2}s ease-in ${Math.random()*0.8}s forwards`,
          }}>
          {piezas[i % piezas.length]}
        </div>
      ))}
      <style>{`
        @keyframes caer {
          0% { transform: translateY(0) rotate(0deg); opacity:1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
        }
        @keyframes pulsar { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @keyframes flotar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes girar { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aparecer { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        @keyframes onda { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(1.04)} }
      `}</style>
    </div>
  );
}

// ── CRONÓMETRO ────────────────────────────────────────────────────────────────
function Cronometro({ duracion }) {
  const [seg, setSeg] = useState(0);
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const pct = Math.min((seg / duracion) * 100, 100);
  const superado = seg >= duracion;
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  useEffect(() => {
    if (on) ref.current = setInterval(() => setSeg(s => s+1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on]);

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-white shadow text-center mt-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">⏱ Cronómetro</p>
      <div className="relative w-20 h-20 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3"/>
          <circle cx="18" cy="18" r="15.9" fill="none"
            stroke={superado ? '#22c55e' : '#6366f1'} strokeWidth="3"
            strokeDasharray="100" strokeDashoffset={100 - pct}
            strokeLinecap="round" style={{transition:'stroke-dashoffset 1s linear'}}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-sm font-black ${superado?'text-green-600':'text-slate-800'}`}>{fmt(seg)}</span>
          {superado && <span className="text-green-500 text-xs">¡Meta!</span>}
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setOn(v=>!v)}
          className={`px-4 py-1.5 rounded-full font-bold text-white text-xs ${on?'bg-amber-500':'bg-indigo-500'}`}>
          {on ? '⏸' : seg===0 ? '▶ Iniciar' : '▶'}
        </button>
        <button onClick={() => { clearInterval(ref.current); setSeg(0); setOn(false); }}
          className="px-3 py-1.5 rounded-full font-bold text-slate-600 bg-slate-100 text-xs">↺</button>
      </div>
    </div>
  );
}

// ── WRAPPER DE ACTIVIDAD con fondo llamativo ──────────────────────────────────
function PantallaActividad({ color, icono, titulo, puntos, duracion, children }) {
  return (
    <div className={`min-h-screen ${color} flex flex-col`} style={{animation:'aparecer 0.4s ease'}}>
      {/* Header colorido */}
      <div className="relative overflow-hidden px-6 pt-8 pb-12 text-white text-center">
        <div className="absolute inset-0 opacity-20">
          {['⭐','✨','🌟','💫'].map((s,i) => (
            <span key={i} className="absolute text-3xl"
              style={{left:`${15+i*22}%`, top:`${10+i*15}%`, animation:`flotar ${2+i*0.5}s ease-in-out infinite`}}>{s}</span>
          ))}
        </div>
        <div className="relative">
          <div className="text-7xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>{icono}</div>
          <h2 className="text-2xl font-black">{titulo}</h2>
          <div className="flex justify-center gap-3 mt-2">
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
              ⏱ {Math.floor(duracion/60)} min
            </span>
            <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
              ⭐ {puntos} pts
            </span>
          </div>
        </div>
      </div>
      {/* Contenido */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 px-6 pt-8 pb-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

// ── BOTÓN VOLVER ──────────────────────────────────────────────────────────────
function BtnVolver({ onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-5 transition-colors text-sm">
      ← Volver
    </button>
  );
}

// ── PANTALLA COMPLETADO ───────────────────────────────────────────────────────
function Completado({ puntos, onVolver }) {
  useEffect(() => { sonidoExito(); hablar(`¡Felicitaciones! Ganaste ${puntos} puntos. ¡Eres increíble!`); }, []);
  return (
    <div className="text-center py-6" style={{animation:'aparecer 0.5s ease'}}>
      <Confeti />
      <div className="text-7xl mb-4" style={{animation:'pulsar 0.6s ease infinite'}}>🏆</div>
      <h3 className="text-3xl font-black text-green-600 mb-2">¡Lo lograste!</h3>
      <p className="text-slate-600 mb-2">Ganaste <strong className="text-yellow-500 text-xl">+{puntos} puntos ⭐</strong></p>
      <button onClick={onVolver}
        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-black px-8 py-3 rounded-2xl shadow-lg text-lg">
        ¡Seguir jugando! →
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MINI JUEGOS
// ════════════════════════════════════════════════════════════════════════════

// 1. RESPIRACIÓN
function JuegoRespiracion({ puntos, onCompletar }) {
  const fases = [
    { label:'Inhala...', dur:4, escala:1.7, color:'#6366f1', emoji:'😮‍💨' },
    { label:'Mantén',    dur:4, escala:1.7, color:'#8b5cf6', emoji:'😌' },
    { label:'Exhala...',  dur:4, escala:1.0, color:'#06b6d4', emoji:'😊' },
  ];
  const [ronda, setRonda] = useState(0);
  const [fase, setFase] = useState(0);
  const [activo, setActivo] = useState(false);
  const [completado, setCompletado] = useState(false);
  const total = 3;

  useEffect(() => {
    if (!activo) return;
    hablar(fases[fase].label);
    const t = setTimeout(() => {
      const sig = (fase+1) % fases.length;
      if (sig === 0) {
        const r = ronda+1;
        if (r >= total) { setActivo(false); setCompletado(true); return; }
        setRonda(r);
      }
      setFase(sig);
    }, fases[fase].dur * 1000);
    return () => clearTimeout(t);
  }, [activo, fase, ronda]);

  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {!activo ? (
        <>
          <div className="flex justify-center gap-4 mb-6 text-5xl">
            <span style={{animation:'flotar 1.5s ease-in-out infinite'}}>🎈</span>
            <span style={{animation:'flotar 2s ease-in-out infinite 0.5s'}}>🌬️</span>
            <span style={{animation:'flotar 1.8s ease-in-out infinite 0.2s'}}>✨</span>
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Respiración mágica</h3>
          <p className="text-slate-500 mb-2">Sigue el círculo con tu respiración.</p>
          <div className="flex justify-center gap-6 my-4 text-sm font-bold text-slate-500">
            <span>😮‍💨 Inhala 4s</span><span>😌 Mantén 4s</span><span>😊 Exhala 4s</span>
          </div>
          <p className="text-indigo-500 font-bold mb-6">× {total} rondas</p>
          <button onClick={() => setActivo(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg transition-all hover:scale-105">
            ¡Empezar! 🫁
          </button>
        </>
      ) : (
        <>
          <p className="text-slate-400 font-bold mb-1">Ronda {ronda+1} de {total}</p>
          <div className="text-4xl mb-3">{fases[fase].emoji}</div>
          <div className="flex items-center justify-center mb-4" style={{height:180}}>
            <div style={{
              width:90, height:90, borderRadius:'50%',
              background:`radial-gradient(circle, ${fases[fase].color}88, ${fases[fase].color})`,
              transform:`scale(${fases[fase].escala})`,
              transition:`transform ${fases[fase].dur}s ease-in-out`,
              boxShadow:`0 0 50px ${fases[fase].color}55`,
            }}/>
          </div>
          <p className="text-3xl font-black text-slate-800">{fases[fase].label}</p>
        </>
      )}
    </div>
  );
}

// 2. BÚSQUEDA DE COLORES
function JuegoBusquedaColores({ puntos, onCompletar }) {
  const obj = [
    { color:'AZUL', emoji:'🔵', hex:'#3b82f6', cant:3 },
    { color:'ROJO', emoji:'🔴', hex:'#ef4444', cant:2 },
    { color:'AMARILLO', emoji:'🟡', hex:'#eab308', cant:1 },
  ];
  const [enc, setEnc] = useState({AZUL:0,ROJO:0,AMARILLO:0});
  const [completado, setCompletado] = useState(false);

  const sumar = (color, max) => {
    if (enc[color] >= max) return;
    sonidoClic();
    hablar('¡Encontrado!');
    const n = {...enc, [color]: enc[color]+1};
    setEnc(n);
    if (obj.every(o => n[o.color] >= o.cant)) setTimeout(() => setCompletado(true), 400);
  };

  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div>
      <div className="text-center mb-5">
        <div className="text-5xl mb-2" style={{animation:'flotar 2s ease-in-out infinite'}}>🔍</div>
        <p className="font-black text-slate-800">¡Busca estos colores a tu alrededor!</p>
        <p className="text-slate-400 text-sm mt-1">Toca el botón cada vez que encuentres uno</p>
      </div>
      <div className="space-y-4">
        {obj.map(o => (
          <div key={o.color} className="rounded-2xl p-4 border-2 flex items-center gap-4"
            style={{borderColor: o.hex, background:`${o.hex}11`}}>
            <span className="text-4xl">{o.emoji}</span>
            <div className="flex-1">
              <p className="font-black" style={{color:o.hex}}>{o.cant} cosa{o.cant>1?'s':''} {o.color}</p>
              <div className="flex gap-2 mt-2">
                {Array.from({length:o.cant}).map((_,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all"
                    style={{borderColor:o.hex, background: i < enc[o.color] ? o.hex : 'transparent', color: i < enc[o.color] ? 'white' : o.hex}}>
                    {i < enc[o.color] ? '✓' : i+1}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => sumar(o.color, o.cant)}
              disabled={enc[o.color] >= o.cant}
              className="px-4 py-2 rounded-xl font-black text-white text-sm disabled:opacity-40 transition-all hover:scale-105 active:scale-95"
              style={{background:o.hex}}>
              {enc[o.color] >= o.cant ? '✓ Listo' : '¡Lo vi!'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. BAILE DE ANIMALES
function JuegoBaileAnimales({ puntos, onCompletar }) {
  const pasos = [
    { animal:'🐘', nombre:'Elefante', inst:'Mueve un brazo como trompa, de lado a lado', dur:8 },
    { animal:'🐸', nombre:'Rana', inst:'¡Salta con los pies juntos 5 veces!', dur:8 },
    { animal:'🦋', nombre:'Mariposa', inst:'Abre y cierra los brazos como alas suavemente', dur:8 },
    { animal:'🐍', nombre:'Serpiente', inst:'Ondula los brazos de arriba a abajo', dur:8 },
  ];
  const [paso, setPaso] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [activo, setActivo] = useState(false);
  const [completado, setCompletado] = useState(false);
  const refI = useRef(null);

  const iniciar = (p) => {
    setActivo(true); setCuenta(0);
    hablar(pasos[p].inst);
    refI.current = setInterval(() => setCuenta(c => {
      if (c+1 >= pasos[p].dur) { clearInterval(refI.current); setActivo(false); return pasos[p].dur; }
      return c+1;
    }), 1000);
  };

  const siguiente = () => {
    const s = paso+1;
    if (s >= pasos.length) { setCompletado(true); sonidoExito(); return; }
    setPaso(s); setCuenta(0);
    setTimeout(() => iniciar(s), 300);
  };

  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  const actual = pasos[paso];
  return (
    <div className="text-center">
      {!activo && cuenta === 0 ? (
        <>
          <div className="flex justify-center gap-3 text-5xl mb-4">
            {pasos.map((p,i) => <span key={i} style={{animation:`flotar ${1.5+i*0.3}s ease-in-out infinite`}}>{p.animal}</span>)}
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Baile de Animales</h3>
          <p className="text-slate-500 mb-6">4 animales · 8 segundos cada uno</p>
          <button onClick={() => iniciar(0)}
            className="bg-green-500 hover:bg-green-600 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all">
            ¡A bailar! 🎶
          </button>
        </>
      ) : (
        <>
          {/* Indicador de pasos */}
          <div className="flex justify-center gap-2 mb-4">
            {pasos.map((_,i) => (
              <div key={i} className="w-3 h-3 rounded-full transition-all"
                style={{background: i < paso ? '#22c55e' : i === paso ? '#f59e0b' : '#e2e8f0',
                  transform: i === paso ? 'scale(1.5)' : 'scale(1)'}}/>
            ))}
          </div>
          <div className="text-8xl mb-2"
            style={{animation: activo ? 'pulsar 0.6s ease-in-out infinite' : 'none'}}>
            {actual.animal}
          </div>
          <p className="text-2xl font-black text-slate-800 mb-1">{actual.nombre}</p>
          <p className="text-slate-600 mb-4">{actual.inst}</p>
          <div className="w-full bg-slate-100 rounded-full h-5 mb-2 overflow-hidden">
            <div className="h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000"
              style={{width:`${(cuenta/actual.dur)*100}%`}}/>
          </div>
          <p className="text-slate-400 text-sm mb-4">{actual.dur - cuenta}s restantes</p>
          {!activo && cuenta >= actual.dur && (
            <button onClick={siguiente}
              className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-3 rounded-2xl text-lg shadow-lg hover:scale-105 transition-all">
              {paso+1 < pasos.length ? `¡Siguiente: ${pasos[paso+1].animal}!` : '¡Terminé!'} →
            </button>
          )}
        </>
      )}
    </div>
  );
}

// 4. EMOCIONES
function JuegoEmociones({ puntos, onCompletar }) {
  const ems = [
    {emoji:'😊',nombre:'Feliz',color:'#fbbf24'},{emoji:'😢',nombre:'Triste',color:'#60a5fa'},
    {emoji:'😠',nombre:'Enojado',color:'#f87171'},{emoji:'😨',nombre:'Asustado',color:'#a78bfa'},
    {emoji:'😌',nombre:'Tranquilo',color:'#34d399'},{emoji:'🤩',nombre:'Emocionado',color:'#fb923c'},
  ];
  const [elegida, setElegida] = useState(null);
  const [fase, setFase] = useState('elegir');

  const elegir = e => {
    sonidoClic(); setElegida(e);
    hablar(`Elegiste: ${e.nombre}. Ahora dibuja esa emoción como un personaje.`);
    setFase('dibujar');
  };

  if (fase === 'listo') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {fase === 'elegir' && (
        <>
          <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>🎨</div>
          <h3 className="text-xl font-black text-slate-800 mb-1">¿Cómo te sientes hoy?</h3>
          <p className="text-slate-400 text-sm mb-5">Toca la emoción que más se parece a lo que sientes</p>
          <div className="grid grid-cols-3 gap-3">
            {ems.map(e => (
              <button key={e.nombre} onClick={() => elegir(e)}
                className="rounded-2xl p-4 border-2 hover:scale-105 transition-all active:scale-95"
                style={{borderColor: e.color, background:`${e.color}15`}}>
                <div className="text-4xl mb-1">{e.emoji}</div>
                <p className="text-xs font-black" style={{color:e.color}}>{e.nombre}</p>
              </button>
            ))}
          </div>
        </>
      )}
      {fase === 'dibujar' && elegida && (
        <>
          <div className="text-7xl mb-3" style={{animation:'pulsar 1s ease-in-out infinite'}}>{elegida.emoji}</div>
          <p className="text-xl font-black mb-4" style={{color:elegida.color}}>Me siento {elegida.nombre}</p>
          <div className="rounded-2xl p-5 mb-5 text-left border-l-4" style={{background:`${elegida.color}15`, borderColor:elegida.color}}>
            <p className="font-black text-slate-700 mb-2">🖍️ Tu misión:</p>
            <p className="text-slate-600 mb-3">Dibuja tu emoción <strong>{elegida.nombre}</strong> como un personaje con papel y lápiz.</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-500">
              <div className="bg-white rounded-xl p-2">¿Grande o pequeño?</div>
              <div className="bg-white rounded-xl p-2">¿Qué color tiene?</div>
              <div className="bg-white rounded-xl p-2">¿Qué forma tiene?</div>
            </div>
          </div>
          <button onClick={() => setFase('listo')}
            className="text-white font-black px-8 py-3 rounded-2xl text-lg shadow-lg hover:scale-105 transition-all"
            style={{background:elegida.color}}>
            ¡Terminé mi dibujo! ✏️
          </button>
        </>
      )}
    </div>
  );
}

// 5. 5 SENTIDOS
function Juego5Sentidos({ puntos, onCompletar }) {
  const sentidos = [
    {icono:'👀',nombre:'VER',cant:5,color:'#6366f1'},
    {icono:'🖐️',nombre:'TOCAR',cant:4,color:'#0ea5e9'},
    {icono:'👂',nombre:'ESCUCHAR',cant:3,color:'#10b981'},
    {icono:'👃',nombre:'OLER',cant:2,color:'#f59e0b'},
    {icono:'👅',nombre:'SABOREAR',cant:1,color:'#ef4444'},
  ];
  const [paso, setPaso] = useState(0);
  const [marc, setMarc] = useState(Array(5).fill(0));
  const [completado, setCompletado] = useState(false);
  const actual = sentidos[paso];

  useEffect(() => {
    if (paso < sentidos.length)
      hablar(`Nombra ${sentidos[paso].cant} cosas que puedes ${sentidos[paso].nombre.toLowerCase()}`);
  }, [paso]);

  const marcar = () => {
    sonidoClic();
    const n = [...marc]; n[paso]++;
    setMarc(n);
    if (n[paso] >= actual.cant) setTimeout(() => {
      if (paso+1 >= sentidos.length) setCompletado(true);
      else setPaso(paso+1);
    }, 400);
  };

  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {/* Barra de progreso entre sentidos */}
      <div className="flex justify-center gap-2 mb-6">
        {sentidos.map((s,i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-black border-2 transition-all"
              style={{borderColor: s.color, background: i < paso ? s.color : i===paso ? `${s.color}22` : 'transparent',
                color: i < paso ? 'white' : s.color, transform: i===paso ? 'scale(1.3)' : 'scale(1)'}}>
              {i < paso ? '✓' : s.icono}
            </div>
            {i < sentidos.length-1 && <div className="w-px h-3" style={{background: i < paso ? s.color : '#e2e8f0'}}/>}
          </div>
        ))}
      </div>

      <div className="text-7xl mb-3" style={{animation:'flotar 1.5s ease-in-out infinite'}}>{actual.icono}</div>
      <p className="text-xl font-black mb-1" style={{color:actual.color}}>
        {actual.cant} cosa{actual.cant>1?'s':''} que puedes {actual.nombre.toLowerCase()}
      </p>
      <p className="text-slate-400 text-sm mb-5">Toca el botón por cada cosa que encuentres</p>

      <div className="flex justify-center gap-3 mb-6">
        {Array.from({length:actual.cant}).map((_,i) => (
          <div key={i} className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-black transition-all"
            style={{borderColor:actual.color, background: i < marc[paso] ? actual.color : 'transparent',
              color: i < marc[paso] ? 'white' : actual.color, transform: i < marc[paso] ? 'scale(1.1)' : 'scale(1)'}}>
            {i < marc[paso] ? '✓' : i+1}
          </div>
        ))}
      </div>

      <button onClick={marcar}
        className="text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
        style={{background:actual.color}}>
        ¡Encontré una! {actual.icono}
      </button>
    </div>
  );
}

// 6. OBSTÁCULOS
function JuegoObstaculos({ puntos, onCompletar }) {
  const retos = [
    {icono:'🐛',texto:'Rastrea bajo una mesa o silla'},
    {icono:'🦘',texto:'Da 5 saltos en un solo pie'},
    {icono:'🚶',texto:'Camina de espaldas hasta la pared'},
    {icono:'🌀',texto:'Gira 3 veces sobre tu eje'},
    {icono:'✂️',texto:'10 saltos de tijera'},
  ];
  const [hechos, setHechos] = useState([]);
  const completado = hechos.length === retos.length;

  const marcar = (i) => {
    if (hechos.includes(i)) return;
    sonidoClic(); hablar('¡Bien hecho!');
    setHechos(prev => [...prev, i]);
    if (hechos.length+1 === retos.length) sonidoExito();
  };

  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div>
      <div className="text-center mb-4">
        <div className="text-5xl mb-2" style={{animation:'flotar 2s ease-in-out infinite'}}>🏃</div>
        <p className="font-black text-slate-800">¡Completa el circuito!</p>
        <p className="text-slate-400 text-sm">Toca cada reto cuando lo hayas completado</p>
        <div className="mt-2 bg-slate-100 rounded-full h-3 overflow-hidden">
          <div className="h-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500"
            style={{width:`${(hechos.length/retos.length)*100}%`}}/>
        </div>
        <p className="text-xs text-slate-400 mt-1">{hechos.length}/{retos.length}</p>
      </div>
      <div className="space-y-3">
        {retos.map((r,i) => (
          <button key={i} onClick={() => marcar(i)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
              hechos.includes(i) ? 'bg-teal-50 border-teal-300' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-3xl">{r.icono}</span>
            <span className={`font-bold flex-1 ${hechos.includes(i) ? 'text-teal-700 line-through' : 'text-slate-700'}`}>
              {r.texto}
            </span>
            <span className="text-xl">{hechos.includes(i) ? '✅' : '⬜'}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 7. POMODORO
function JuegoPomodoro({ puntos, onCompletar }) {
  const [tarea, setTarea] = useState('');
  const [fase, setFase] = useState('escribir');
  const [seg, setSeg] = useState(25*60);
  const [on, setOn] = useState(false);
  const ref = useRef(null);
  const pct = ((25*60-seg)/(25*60))*100;
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  useEffect(() => {
    if (on && seg > 0) {
      ref.current = setInterval(() => setSeg(s => {
        if (s<=1) { clearInterval(ref.current); setOn(false); setFase('descanso'); sonidoExito(); hablar('¡Tiempo! Descansa 5 minutos. ¡Lo hiciste increíble!'); return 0; }
        return s-1;
      }), 1000);
    }
    return () => clearInterval(ref.current);
  }, [on]);

  if (fase === 'descanso') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {fase === 'escribir' ? (
        <>
          <div className="text-6xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>🍅</div>
          <h3 className="text-xl font-black text-slate-800 mb-1">Técnica Pomodoro</h3>
          <p className="text-slate-400 text-sm mb-5">¿En qué vas a enfocarte 25 minutos?</p>
          <input value={tarea} onChange={e => setTarea(e.target.value)}
            placeholder="Ej: Tarea de matemáticas..."
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold mb-4 focus:outline-none focus:border-red-400 text-center"/>
          <button disabled={!tarea.trim()} onClick={() => { setFase('foco'); hablar(`Tu tarea es: ${tarea}. ¡Silencia el teléfono, tú puedes!`); }}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all">
            ¡A enfocarse! 🎯
          </button>
        </>
      ) : (
        <>
          <p className="text-slate-500 text-sm mb-1">Trabajando en:</p>
          <p className="font-black text-slate-800 mb-4">"{tarea}"</p>
          <div className="relative w-44 h-44 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fee2e2" strokeWidth="2.5"/>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ef4444" strokeWidth="2.5"
                strokeDasharray="100" strokeDashoffset={100-pct}
                strokeLinecap="round" style={{transition:'stroke-dashoffset 1s linear'}}/>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-red-600">{fmt(seg)}</span>
              <span className="text-xs text-slate-400">restantes</span>
            </div>
          </div>
          <button onClick={() => setOn(v=>!v)}
            className={`px-10 py-4 rounded-2xl font-black text-white text-xl shadow-lg hover:scale-105 transition-all ${on?'bg-amber-500':'bg-red-500'}`}>
            {on ? '⏸ Pausar' : '▶ Iniciar foco'}
          </button>
        </>
      )}
    </div>
  );
}

// 8. GRATITUD
function JuegoGratitud({ puntos, onCompletar }) {
  const preguntas = [
    {q:'¿Qué cosa agradeces hoy?', icono:'🌟'},
    {q:'Otra cosa que te alegra...', icono:'💛'},
    {q:'Una más, pequeña o grande...', icono:'🌈'},
    {q:'¿Quién te alegró el día?', icono:'🤗'},
  ];
  const [resp, setResp] = useState(['','','','']);
  const [fase, setFase] = useState('escribir');

  const listo = resp.filter(r=>r.trim()).length >= 3;
  if (fase === 'listo') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div>
      <div className="text-center mb-4">
        <div className="text-5xl mb-2" style={{animation:'flotar 2s ease-in-out infinite'}}>✍️</div>
        <p className="font-black text-slate-800">Diario de gratitud</p>
        <p className="text-slate-400 text-sm">Responde al menos 3 preguntas</p>
      </div>
      <div className="space-y-3 mb-4">
        {preguntas.map((p,i) => (
          <div key={i} className="flex gap-3 items-center bg-amber-50 rounded-2xl p-3 border border-amber-100">
            <span className="text-2xl">{p.icono}</span>
            <input value={resp[i]} onChange={e => { const n=[...resp]; n[i]=e.target.value; setResp(n); }}
              placeholder={p.q}
              className="flex-1 bg-transparent text-slate-700 text-sm font-semibold focus:outline-none placeholder-slate-400"/>
          </div>
        ))}
      </div>
      <button disabled={!listo} onClick={() => { setFase('listo'); hablar('¡Excelente! Practicar la gratitud hace que te sientas mejor cada día.'); sonidoExito(); }}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-black py-4 rounded-2xl text-xl shadow-lg hover:scale-[1.02] transition-all">
        ¡Listo! 🌻
      </button>
    </div>
  );
}

// 9. ESCANEO CORPORAL
function JuegoEscaneo({ puntos, onCompletar }) {
  const zonas = [
    {zona:'Pies',icono:'🦶',color:'#6366f1'},{zona:'Pantorrillas',icono:'🦵',color:'#8b5cf6'},
    {zona:'Muslos',icono:'🦵',color:'#a78bfa'},{zona:'Abdomen',icono:'🫁',color:'#0ea5e9'},
    {zona:'Manos',icono:'🖐️',color:'#10b981'},{zona:'Hombros',icono:'💪',color:'#f59e0b'},
    {zona:'Cara',icono:'😌',color:'#ef4444'},
  ];
  const [paso, setPaso] = useState(0);
  const [fase, setFase] = useState('inicio');
  const [cuenta, setCuenta] = useState(0);
  const refI = useRef(null);

  const siguienteZona = (p) => {
    const s = p+1;
    if (s >= zonas.length) { setFase('completado'); sonidoExito(); return; }
    setPaso(s); setFase('tensionar'); setCuenta(5);
    hablar(`${zonas[s].zona}. Tensiona los músculos.`);
    startCuenta(5, () => { setFase('soltar'); setCuenta(3); hablar('Suelta. Siente el alivio.'); startCuenta(3, () => siguienteZona(s)); });
  };

  const startCuenta = (inicio, onFin) => {
    let c = inicio;
    refI.current = setInterval(() => {
      c--;
      setCuenta(c);
      if (c <= 0) { clearInterval(refI.current); onFin(); }
    }, 1000);
  };

  const iniciar = () => {
    setFase('tensionar'); setCuenta(5);
    hablar(`${zonas[0].zona}. Tensiona los músculos 5 segundos.`);
    startCuenta(5, () => { setFase('soltar'); setCuenta(3); hablar('Suelta. Siente el alivio.'); startCuenta(3, () => siguienteZona(0)); });
  };

  if (fase === 'completado') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {fase === 'inicio' ? (
        <>
          <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>🧘</div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Escaneo corporal</h3>
          <p className="text-slate-500 mb-4">Tensiona y suelta cada parte del cuerpo.</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {zonas.map((z,i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{background:z.color}}>{z.icono} {z.zona}</span>
            ))}
          </div>
          <button onClick={iniciar}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all">
            Comenzar 🫁
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center gap-1 mb-4">
            {zonas.map((_,i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full transition-all"
                style={{background: i < paso ? '#22c55e' : i===paso ? zonas[paso].color : '#e2e8f0',
                  transform: i===paso ? 'scale(1.6)' : 'scale(1)'}}/>
            ))}
          </div>
          <div className="text-7xl mb-3" style={{animation:'pulsar 0.8s ease-in-out infinite'}}>
            {zonas[paso].icono}
          </div>
          <p className="text-2xl font-black mb-1" style={{color:zonas[paso].color}}>{zonas[paso].zona}</p>
          <p className="text-slate-600 font-bold mb-4">
            {fase==='tensionar' ? '💪 Tensiona...' : '😮‍💨 Suelta...'}
          </p>
          <div className="text-6xl font-black" style={{color:zonas[paso].color, animation:'pulsar 1s ease-in-out infinite'}}>
            {cuenta}
          </div>
        </>
      )}
    </div>
  );
}

// 10. MAPA MENTAL
function JuegoMapaMental({ puntos, onCompletar }) {
  const [tema, setTema] = useState('');
  const [ramas, setRamas] = useState(['','','']);
  const [fase, setFase] = useState('tema');
  const llenas = ramas.filter(r=>r.trim()).length >= 3;

  if (fase === 'listo') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div>
      {fase === 'tema' ? (
        <div className="text-center">
          <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>🗺️</div>
          <p className="font-black text-slate-800 mb-1">Mapa Mental Express</p>
          <p className="text-slate-400 text-sm mb-5">¿Cuál es tu tema central?</p>
          <input value={tema} onChange={e=>setTema(e.target.value)}
            placeholder="Ej: Mi proyecto de historia..."
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-800 font-semibold mb-4 focus:outline-none focus:border-emerald-400 text-center"/>
          <button disabled={!tema.trim()} onClick={() => { setFase('ramas'); hablar(`Tu tema es ${tema}. Agrega al menos 3 ideas relacionadas.`); }}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all">
            Siguiente →
          </button>
        </div>
      ) : (
        <div>
          <div className="bg-emerald-100 border-2 border-emerald-300 rounded-2xl p-4 text-center mb-5">
            <p className="text-xs text-emerald-600 uppercase font-bold">Tema central</p>
            <p className="text-xl font-black text-emerald-800">{tema}</p>
          </div>
          <div className="space-y-2 mb-3">
            {ramas.map((r,i) => (
              <div key={i} className="flex gap-2 items-center bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <span className="text-emerald-500 font-black w-5">{i+1}.</span>
                <input value={r} onChange={e=>{const n=[...ramas];n[i]=e.target.value;setRamas(n);}}
                  placeholder={`Idea ${i+1}...`}
                  className="flex-1 bg-transparent text-slate-700 text-sm font-semibold focus:outline-none"/>
              </div>
            ))}
          </div>
          <button onClick={() => setRamas(r=>[...r,''])} className="text-emerald-600 text-sm font-bold mb-4">+ Agregar idea</button>
          <button disabled={!llenas} onClick={() => { setFase('listo'); sonidoExito(); hablar('¡Mapa mental completado! Tus ideas están organizadas.'); }}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white font-black py-4 rounded-2xl text-xl shadow-lg hover:scale-[1.02] transition-all">
            ¡Listo! 🌿
          </button>
        </div>
      )}
    </div>
  );
}

// 11. DIARIO EMOCIONES ADOLESCENTES
function JuegoDiarioEmociones({ puntos, onCompletar }) {
  const preguntas = [
    {q:'¿Qué emoción predominó hoy?',icono:'🌡️',tipo:'range'},
    {q:'¿Qué la provocó?',icono:'💭',tipo:'text'},
    {q:'¿Cómo reaccioné?',icono:'⚡',tipo:'text'},
    {q:'¿Cómo me hubiera gustado reaccionar?',icono:'✨',tipo:'text'},
  ];
  const [paso, setPaso] = useState(0);
  const [resp, setResp] = useState(['5','','','']);
  const [completado, setCompletado] = useState(false);
  const actual = preguntas[paso];

  useEffect(() => { hablar(actual.q); }, [paso]);
  if (completado) return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      <div className="flex justify-center gap-1 mb-5">
        {preguntas.map((_,i) => (
          <div key={i} className="h-2.5 rounded-full transition-all"
            style={{background: i <= paso ? '#8b5cf6' : '#e2e8f0', width: i===paso?32:12}}/>
        ))}
      </div>
      <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>{actual.icono}</div>
      <p className="text-slate-800 font-black text-lg mb-5">{actual.q}</p>
      {actual.tipo==='range' ? (
        <div className="mb-6">
          <input type="range" min="1" max="10" value={resp[paso]}
            onChange={e=>{const n=[...resp];n[paso]=e.target.value;setResp(n);}}
            className="w-full accent-purple-500"/>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>😔 Muy mal</span>
            <span className="text-3xl font-black text-purple-600">{resp[paso]}/10</span>
            <span>😄 Muy bien</span>
          </div>
        </div>
      ) : (
        <textarea value={resp[paso]} onChange={e=>{const n=[...resp];n[paso]=e.target.value;setResp(n);}}
          placeholder="Escribe aquí..." rows={3}
          className="w-full border-2 border-purple-200 rounded-2xl px-4 py-3 text-slate-700 text-sm mb-6 focus:outline-none focus:border-purple-400 resize-none bg-purple-50"/>
      )}
      <button onClick={() => {
          sonidoClic();
          if (paso+1 >= preguntas.length) { setCompletado(true); sonidoExito(); hablar('¡Diario completado! Reflexionar sobre tus emociones es muy valioso.'); }
          else setPaso(paso+1);
        }}
        disabled={actual.tipo==='text' && !resp[paso].trim()}
        className="bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white font-black px-10 py-4 rounded-2xl text-xl shadow-lg hover:scale-105 transition-all">
        {paso+1 < preguntas.length ? 'Siguiente →' : '¡Listo! ✨'}
      </button>
    </div>
  );
}

// 12. SIN PANTALLAS
function JuegoSinPantallas({ puntos, onCompletar }) {
  const opciones = [
    {icono:'📖',texto:'Leer algo que me guste'},
    {icono:'🎨',texto:'Dibujar o colorear'},
    {icono:'🚶',texto:'Salir a caminar'},
    {icono:'🎸',texto:'Tocar un instrumento'},
    {icono:'🤫',texto:'Estar en silencio'},
  ];
  const [elegida, setElegida] = useState(null);
  const [fase, setFase] = useState('elegir');
  const [seg, setSeg] = useState(0);
  const [on, setOn] = useState(false);
  const [ref2, setRef2] = useState('');
  const ref = useRef(null);
  const meta = 30*60;
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  useEffect(() => {
    if (on) ref.current = setInterval(() => setSeg(s=>s+1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [on]);

  if (fase === 'listo') return <Completado puntos={puntos} onVolver={onCompletar} />;

  return (
    <div className="text-center">
      {fase === 'elegir' && (
        <>
          <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>📵</div>
          <p className="font-black text-slate-800 mb-1">Reto sin pantallas</p>
          <p className="text-slate-400 text-sm mb-5">¿Qué harás 30 minutos sin el teléfono?</p>
          <div className="space-y-2">
            {opciones.map(o => (
              <button key={o.texto} onClick={() => { setElegida(o); setFase('cronometro'); sonidoClic(); hablar(`Elegiste: ${o.texto}. Pon el teléfono en otro cuarto y presiona iniciar.`); }}
                className="w-full flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border-2 border-slate-200 hover:border-slate-400 transition-all text-left hover:scale-[1.02]">
                <span className="text-3xl">{o.icono}</span>
                <span className="font-bold text-slate-700">{o.texto}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {fase === 'cronometro' && elegida && (
        <>
          <div className="text-6xl mb-2" style={{animation:'flotar 2s ease-in-out infinite'}}>{elegida.icono}</div>
          <p className="font-black text-slate-800 mb-3">{elegida.texto}</p>
          <div className="text-5xl font-black text-slate-700 mb-2">{fmt(seg)}</div>
          <div className="w-full bg-slate-100 rounded-full h-4 mb-3">
            <div className="h-4 rounded-full bg-gradient-to-r from-slate-500 to-slate-700 transition-all"
              style={{width:`${Math.min((seg/meta)*100,100)}%`}}/>
          </div>
          <p className="text-slate-400 text-sm mb-4">Meta: 30 min · {Math.max(0,30-Math.floor(seg/60))} min restantes</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setOn(v=>!v)}
              className={`px-6 py-3 rounded-xl font-black text-white text-lg ${on?'bg-amber-500':'bg-slate-700'}`}>
              {on ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            {seg >= 60 && !on && (
              <button onClick={() => setFase('reflexion')}
                className="px-6 py-3 rounded-xl font-black text-white bg-green-500 text-lg">✓ Terminé</button>
            )}
          </div>
        </>
      )}
      {fase === 'reflexion' && (
        <>
          <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>💭</div>
          <p className="font-black text-slate-800 mb-1">¿Cómo te sentiste?</p>
          <p className="text-slate-400 text-sm mb-4">Escribe cómo fue la experiencia</p>
          <textarea value={ref2} onChange={e=>setRef2(e.target.value)}
            placeholder="Me sentí..." rows={4}
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-slate-700 text-sm mb-4 focus:outline-none focus:border-slate-400 resize-none"/>
          <button disabled={!ref2.trim()} onClick={() => { setFase('listo'); sonidoExito(); hablar('¡Felicitaciones por el reto sin pantallas!'); }}
            className="w-full bg-slate-700 hover:bg-slate-800 disabled:opacity-40 text-white font-black py-4 rounded-2xl text-xl shadow-lg">
            ¡Lo logré! ⭐
          </button>
        </>
      )}
    </div>
  );
}

// ── MAPA DE JUEGOS ────────────────────────────────────────────────────────────
const miniJuegos = {
  1:JuegoRespiracion, 2:JuegoBusquedaColores, 3:JuegoBaileAnimales,
  4:JuegoEmociones, 5:Juego5Sentidos, 6:JuegoObstaculos,
  7:JuegoPomodoro, 8:JuegoGratitud, 9:JuegoEscaneo,
  10:JuegoMapaMental, 11:JuegoDiarioEmociones, 12:JuegoSinPantallas,
};

// ── DATOS ─────────────────────────────────────────────────────────────────────
const actividades = {
  ninos: [
    {id:1, titulo:"El Rincón de la Calma", desc:"Respiración guiada con animación", icono:"🎈", bgColor:"bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-500", duracion:120, puntos:20},
    {id:2, titulo:"Búsqueda de Tesoros", desc:"Encuentra objetos por color", icono:"🔍", bgColor:"bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500", duracion:300, puntos:30},
    {id:3, titulo:"Baile de Animales", desc:"Imita a tus animales favoritos", icono:"🦁", bgColor:"bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500", duracion:120, puntos:25},
    {id:4, titulo:"Dibuja tus Emociones", desc:"Expresa cómo te sientes hoy", icono:"🎨", bgColor:"bg-gradient-to-br from-pink-400 via-rose-400 to-red-400", duracion:600, puntos:35},
    {id:5, titulo:"Los 5 Sentidos", desc:"Activa todos tus sentidos", icono:"✨", bgColor:"bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500", duracion:180, puntos:30},
    {id:6, titulo:"Carrera de Obstáculos", desc:"Crea un circuito y supéralo", icono:"🏃", bgColor:"bg-gradient-to-br from-teal-400 via-cyan-400 to-sky-500", duracion:240, puntos:40},
  ],
  adolescentes: [
    {id:7, titulo:"Técnica Pomodoro", desc:"25 min de enfoque total", icono:"🍅", bgColor:"bg-gradient-to-br from-red-400 via-rose-500 to-pink-500", duracion:1500, puntos:50},
    {id:8, titulo:"Desafío de Gratitud", desc:"Escribe lo positivo de tu día", icono:"✍️", bgColor:"bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400", duracion:300, puntos:30},
    {id:9, titulo:"Escaneo Corporal", desc:"Relaja cada parte de tu cuerpo", icono:"🧘", bgColor:"bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-500", duracion:600, puntos:40},
    {id:10, titulo:"Mapa Mental Express", desc:"Organiza tus ideas visualmente", icono:"🗺️", bgColor:"bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500", duracion:600, puntos:45},
    {id:11, titulo:"Diario de Emociones", desc:"Reflexiona sobre tu día", icono:"📓", bgColor:"bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500", duracion:480, puntos:40},
    {id:12, titulo:"Reto sin Pantallas", desc:"30 min desconectado/a", icono:"📵", bgColor:"bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700", duracion:1800, puntos:60},
  ],
};

// ── TARJETA ───────────────────────────────────────────────────────────────────
function Tarjeta({ item, onSeleccionar, completada }) {
  return (
    <div className="relative group cursor-pointer" onClick={() => { sonidoClic(); onSeleccionar(item); }}>
      {completada && (
        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-black px-2 py-1 rounded-full shadow">✓ Hecha</div>
      )}
      <div className={`${item.bgColor} rounded-3xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]`}>
        <div className="text-5xl mb-3" style={{animation:'flotar 2s ease-in-out infinite'}}>{item.icono}</div>
        <h3 className="text-lg font-black mb-1">{item.titulo}</h3>
        <p className="text-white/80 text-sm mb-4">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="bg-white/20 backdrop-blur text-xs font-bold px-3 py-1 rounded-full">⏱ {Math.floor(item.duracion/60)} min</span>
          <span className="bg-white/20 backdrop-blur text-xs font-bold px-3 py-1 rounded-full">⭐ {item.puntos} pts</span>
        </div>
      </div>
      <style>{`@keyframes flotar{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ── PRINCIPAL ─────────────────────────────────────────────────────────────────
export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos');
  const [seleccionada, setSeleccionada] = useState(null);
  const [pts, setPts] = useState(() => parseInt(localStorage.getItem('nexus_puntos')||'0'));
  const [completadas, setCompletadas] = useState(() => JSON.parse(localStorage.getItem('nexus_completadas')||'[]'));

  const agregarPuntos = (p) => {
    if (!seleccionada || completadas.includes(seleccionada.id)) { setSeleccionada(null); return; }
    const n = pts+p; const c = [...completadas, seleccionada.id];
    setPts(n); setCompletadas(c);
    localStorage.setItem('nexus_puntos', n.toString());
    localStorage.setItem('nexus_completadas', JSON.stringify(c));
    setTimeout(() => setSeleccionada(null), 2500);
  };

  const nivel = pts<100?{nombre:'Explorador',icono:'🌱',sig:100}
    :pts<250?{nombre:'Aventurero',icono:'⚡',sig:250}
    :pts<500?{nombre:'Campeón',icono:'🏆',sig:500}
    :{nombre:'Leyenda',icono:'🌟',sig:pts};
  const progreso = Math.min((pts/nivel.sig)*100,100);

  // Vista detalle
  if (seleccionada) {
    const MiniJuego = miniJuegos[seleccionada.id];
    return (
      <PantallaActividad
        color={seleccionada.bgColor}
        icono={seleccionada.icono}
        titulo={seleccionada.titulo}
        puntos={seleccionada.puntos}
        duracion={seleccionada.duracion}>
        <BtnVolver onClick={() => { detenerVoz(); setSeleccionada(null); }} />
        {completadas.includes(seleccionada.id) ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-3">🏆</div>
            <p className="text-2xl font-black text-green-600">¡Ya completaste esta actividad!</p>
            <p className="text-slate-400 mt-2">Elige otra para seguir ganando puntos</p>
          </div>
        ) : (
          MiniJuego && <MiniJuego puntos={seleccionada.puntos} onCompletar={agregarPuntos} />
        )}
        <Cronometro duracion={seleccionada.duracion} />
      </PantallaActividad>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors">
          ← Volver al inicio
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Actividades 🎮</h1>
            <p className="text-slate-500 mt-1">Explora, aprende y gana puntos</p>
          </div>
          {/* Panel puntos */}
          <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100 min-w-64">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{nivel.icono}</span>
              <div>
                <p className="font-black text-slate-800">{nivel.nombre}</p>
                <p className="text-2xl font-black text-blue-600">{pts} pts</p>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-700"
                style={{width:`${progreso}%`}}/>
            </div>
            <p className="text-xs text-slate-400 mt-1 text-right">{pts} / {nivel.sig} pts</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {['ninos','adolescentes'].map(cat => (
            <button key={cat} onClick={() => { setCategoria(cat); sonidoClic(); }}
              className={`px-8 py-3 rounded-2xl font-black transition-all text-base ${
                categoria===cat
                  ? cat==='ninos' ? 'bg-blue-600 text-white shadow-lg' : 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-200'
              }`}>
              {cat==='ninos' ? '🧒 Niños (6-12)' : '🧑 Adolescentes (13-18)'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {actividades[categoria].map(item => (
            <Tarjeta key={item.id} item={item} onSeleccionar={setSeleccionada}
              completada={completadas.includes(item.id)} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100 text-center">
          <p className="text-slate-600 font-bold">
            Has completado <span className="text-blue-600 font-black text-xl">{completadas.length}</span> actividades
            {completadas.length>=6 && ' 🔥 ¡Eres una máquina!'}
            {completadas.length>=3 && completadas.length<6 && ' 🎉 ¡Vas increíble!'}
            {completadas.length===0 && ' — ¡Empieza la primera ahora!'}
          </p>
        </div>
      </div>
    </div>
  );
}

