import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── DATOS DE ACTIVIDADES ──────────────────────────────────────────────────────
const contenidoActividades = {
  ninos: [
    {
      id: 1,
      titulo: "El Rincón de la Calma",
      desc: "Ejercicios de respiración guiada para calmarte.",
      contenido: "Pon una mano en tu barriga. Inhala por la nariz contando hasta 4 (siente cómo sube tu barriga), mantén el aire 4 segundos y exhala suavemente por la boca en 4 segundos. Imagina que soplas una vela sin apagarla. ¡Repite 5 veces!",
      icono: "🎈",
      color: "from-sky-400 to-blue-500",
      colorLight: "bg-sky-50",
      colorBorder: "border-sky-200",
      colorBtn: "bg-sky-500 hover:bg-sky-600",
      duracion: 120,
      puntos: 20,
      tipo: "respiracion",
    },
    {
      id: 2,
      titulo: "Búsqueda de Tesoros",
      desc: "Explora tu entorno y encuentra objetos por color.",
      contenido: "¡Es hora de explorar! Mira a tu alrededor y encuentra 3 cosas de color AZUL, 2 cosas de color ROJO y 1 cosa de color AMARILLO. ¡Dime cuáles son y para qué sirven! Puedes dibujarlas o escribir sus nombres.",
      icono: "🔍",
      color: "from-amber-400 to-orange-500",
      colorLight: "bg-amber-50",
      colorBorder: "border-amber-200",
      colorBtn: "bg-amber-500 hover:bg-amber-600",
      duracion: 300,
      puntos: 30,
      tipo: "exploracion",
    },
    {
      id: 3,
      titulo: "Baile de Animales",
      desc: "Mueve el cuerpo imitando tus animales favoritos.",
      contenido: "¡A moverse! Durante 2 minutos, imita estos animales: 🐘 Elefante (mueve un brazo como trompa), 🐸 Rana (salta con los pies juntos), 🦋 Mariposa (abre y cierra los brazos), 🐍 Serpiente (deslízate por el suelo). ¡30 segundos cada uno!",
      icono: "🦁",
      color: "from-green-400 to-emerald-500",
      colorLight: "bg-green-50",
      colorBorder: "border-green-200",
      colorBtn: "bg-green-500 hover:bg-green-600",
      duracion: 120,
      puntos: 25,
      tipo: "movimiento",
    },
    {
      id: 4,
      titulo: "Dibuja tus Emociones",
      desc: "Expresa cómo te sientes a través del dibujo.",
      contenido: "Toma papel y colores. Dibuja tu emoción de hoy como si fuera un personaje. ¿Es grande o pequeño? ¿Qué color tiene? ¿Tiene cara feliz, triste o enojada? No importa cómo salga el dibujo, ¡lo importante es expresarte!",
      icono: "🎨",
      color: "from-pink-400 to-rose-500",
      colorLight: "bg-pink-50",
      colorBorder: "border-pink-200",
      colorBtn: "bg-pink-500 hover:bg-pink-600",
      duracion: 600,
      puntos: 35,
      tipo: "creativo",
    },
    {
      id: 5,
      titulo: "Cuento de los 5 Sentidos",
      desc: "Activa todos tus sentidos con este juego.",
      contenido: "Siéntate cómodo y nombra: 5 cosas que PUEDES VER ahora mismo, 4 cosas que PUEDES TOCAR cerca de ti, 3 cosas que PUEDES ESCUCHAR, 2 cosas que PUEDES OLER, 1 cosa que PUEDES SABOREAR. Esto se llama técnica 5-4-3-2-1 y ayuda a calmar la mente.",
      icono: "✨",
      color: "from-violet-400 to-purple-500",
      colorLight: "bg-violet-50",
      colorBorder: "border-violet-200",
      colorBtn: "bg-violet-500 hover:bg-violet-600",
      duracion: 180,
      puntos: 30,
      tipo: "mindfulness",
    },
    {
      id: 6,
      titulo: "Carrera de Obstáculos",
      desc: "Crea un circuito en casa y supéralo.",
      contenido: "Diseña un mini circuito en tu habitación o sala: 1) Rastrea bajo una mesa, 2) Da 5 saltos en un pie, 3) Camina de espaldas hasta la pared, 4) Gira 3 veces y 5) Termina con 10 saltos de tijera. ¡Intenta hacerlo más rápido cada vez!",
      icono: "🏃",
      color: "from-teal-400 to-cyan-500",
      colorLight: "bg-teal-50",
      colorBorder: "border-teal-200",
      colorBtn: "bg-teal-500 hover:bg-teal-600",
      duracion: 240,
      puntos: 40,
      tipo: "movimiento",
    },
  ],
  adolescentes: [
    {
      id: 7,
      titulo: "Técnica Pomodoro",
      desc: "Sesión de enfoque de 25 minutos.",
      contenido: "Elige UNA tarea que tengas pendiente (tarea, lectura, proyecto). Silencia el teléfono. Trabaja con total concentración durante 25 minutos, sin redes sociales ni distracciones. Cuando suene el timer, tómate 5 minutos de descanso. ¡Un pomodoro completado = un gran avance!",
      icono: "🍅",
      color: "from-red-400 to-rose-600",
      colorLight: "bg-red-50",
      colorBorder: "border-red-200",
      colorBtn: "bg-red-500 hover:bg-red-600",
      duracion: 1500,
      puntos: 50,
      tipo: "foco",
    },
    {
      id: 8,
      titulo: "Desafío de Gratitud",
      desc: "Escribe 3 cosas positivas de tu día.",
      contenido: "Toma un cuaderno o tu teléfono y escribe: 3 cosas que agradeces hoy (puede ser algo pequeño como 'el sol que entró por la ventana'), 1 persona que te alegró el día y por qué, y 1 cosa que aprendiste hoy aunque sea mínima. Guarda este registro; en una semana te sorprenderás al releerlo.",
      icono: "✍️",
      color: "from-amber-400 to-yellow-500",
      colorLight: "bg-amber-50",
      colorBorder: "border-amber-200",
      colorBtn: "bg-amber-500 hover:bg-amber-600",
      duracion: 300,
      puntos: 30,
      tipo: "bienestar",
    },
    {
      id: 9,
      titulo: "Escaneo Corporal",
      desc: "Relaja cada parte de tu cuerpo conscientemente.",
      contenido: "Acuéstate o siéntate cómodamente. Cierra los ojos. Empieza por los pies: tensiona los músculos 5 segundos y suéltalos. Sube lentamente: pantorrillas, muslos, abdomen, manos, brazos, hombros, cuello y cara. Al final, respira profundo 3 veces. Este ejercicio reduce la tensión acumulada.",
      icono: "🧘",
      color: "from-indigo-400 to-blue-600",
      colorLight: "bg-indigo-50",
      colorBorder: "border-indigo-200",
      colorBtn: "bg-indigo-500 hover:bg-indigo-600",
      duracion: 600,
      puntos: 40,
      tipo: "relajacion",
    },
    {
      id: 10,
      titulo: "Mapa Mental Express",
      desc: "Organiza tus ideas en 10 minutos.",
      contenido: "Elige un tema que tengas en mente (un problema, una meta, una decisión). En el centro de una hoja escribe el tema. Dibuja ramas con ideas relacionadas. Desde cada rama, dibuja sub-ramas con detalles. No juzgues las ideas, solo escribe. Al terminar tendrás una visión clara del tema.",
      icono: "🗺️",
      color: "from-emerald-400 to-green-600",
      colorLight: "bg-emerald-50",
      colorBorder: "border-emerald-200",
      colorBtn: "bg-emerald-500 hover:bg-emerald-600",
      duracion: 600,
      puntos: 45,
      tipo: "cognitivo",
    },
    {
      id: 11,
      titulo: "Diario de Emociones",
      desc: "Reflexiona sobre tus emociones del día.",
      contenido: "Responde estas preguntas hoy: ¿Qué emoción predominó hoy en una escala del 1-10? ¿Qué la provocó? ¿Cómo reaccioné? ¿Cómo me hubiera gustado reaccionar? ¿Qué necesito mañana para estar mejor? No hay respuestas correctas o incorrectas; este es tu espacio seguro.",
      icono: "📓",
      color: "from-purple-400 to-violet-600",
      colorLight: "bg-purple-50",
      colorBorder: "border-purple-200",
      colorBtn: "bg-purple-500 hover:bg-purple-600",
      duracion: 480,
      puntos: 40,
      tipo: "bienestar",
    },
    {
      id: 12,
      titulo: "Reto sin Pantallas",
      desc: "30 minutos desconectado, conectado contigo.",
      contenido: "Pon el teléfono en otro cuarto (no silenciado, sino en otro cuarto). Durante 30 minutos elige UNA de estas opciones: leer algo que te guste, dibujar o colorear, salir a caminar, tocar un instrumento, o simplemente estar en silencio. Al terminar escribe cómo te sentiste.",
      icono: "📵",
      color: "from-slate-500 to-gray-700",
      colorLight: "bg-slate-50",
      colorBorder: "border-slate-200",
      colorBtn: "bg-slate-600 hover:bg-slate-700",
      duracion: 1800,
      puntos: 60,
      tipo: "desconexion",
    },
  ],
};

// ── COMPONENTE TEMPORIZADOR ───────────────────────────────────────────────────
function Temporizador({ duracion, onCompletar }) {
  const [segundos, setSegundos] = useState(duracion);
  const [corriendo, setCorriendo] = useState(false);
  const [completado, setCompletado] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (corriendo && segundos > 0) {
      intervalRef.current = setInterval(() => {
        setSegundos(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setCorriendo(false);
            setCompletado(true);
            onCompletar();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [corriendo]);

  const formatear = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const seg = (s % 60).toString().padStart(2, '0');
    return `${m}:${seg}`;
  };

  const porcentaje = ((duracion - segundos) / duracion) * 100;

  const reiniciar = () => {
    clearInterval(intervalRef.current);
    setSegundos(duracion);
    setCorriendo(false);
    setCompletado(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
      <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">⏱ Temporizador</p>

      {/* Círculo de progreso */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <circle
            cx="18" cy="18" r="15.9" fill="none"
            stroke={completado ? "#22c55e" : "#3b82f6"}
            strokeWidth="2.5"
            strokeDasharray="100"
            strokeDashoffset={100 - porcentaje}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-black ${completado ? 'text-green-600' : 'text-slate-800'}`}>
            {completado ? '✓' : formatear(segundos)}
          </span>
        </div>
      </div>

      {completado ? (
        <div>
          <p className="text-green-600 font-bold mb-3">¡Tiempo completado! 🎉</p>
          <button onClick={reiniciar} className="text-sm text-slate-500 underline">Reiniciar</button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setCorriendo(!corriendo)}
            className={`px-6 py-2 rounded-full font-bold text-white text-sm transition-all ${corriendo ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {corriendo ? '⏸ Pausar' : '▶ Iniciar'}
          </button>
          <button onClick={reiniciar} className="px-4 py-2 rounded-full font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm">↺</button>
        </div>
      )}
    </div>
  );
}

// ── COMPONENTE TARJETA ────────────────────────────────────────────────────────
function TarjetaActividad({ item, onSeleccionar }) {
  return (
    <div
      className={`${item.colorLight} ${item.colorBorder} border-2 rounded-3xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group`}
      onClick={() => onSeleccionar(item)}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform`}>
        {item.icono}
      </div>
      <h3 className="text-lg font-black text-slate-800 mb-1">{item.titulo}</h3>
      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">
          ⏱ {Math.floor(item.duracion / 60)} min
        </span>
        <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          ⭐ {item.puntos} pts
        </span>
      </div>
    </div>
  );
}

// ── COMPONENTE DETALLE ────────────────────────────────────────────────────────
function DetalleActividad({ item, onVolver, onCompletar }) {
  const [timerFinalizado, setTimerFinalizado] = useState(false);
  const [completada, setCompletada] = useState(false);

  const handleCompletar = () => {
    setCompletada(true);
    onCompletar(item.puntos);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onVolver}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors"
      >
        ← Volver a actividades
      </button>

      <div className={`bg-gradient-to-br ${item.color} rounded-3xl p-8 text-white mb-6 shadow-xl`}>
        <div className="text-5xl mb-4">{item.icono}</div>
        <h2 className="text-3xl font-black mb-2">{item.titulo}</h2>
        <div className="flex gap-3">
          <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
            ⏱ {Math.floor(item.duracion / 60)} minutos
          </span>
          <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-bold">
            ⭐ {item.puntos} puntos
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">
        <h3 className="font-black text-slate-700 text-sm uppercase tracking-widest mb-3">📋 Instrucciones</h3>
        <p className="text-slate-700 leading-relaxed text-base">{item.contenido}</p>
      </div>

      <Temporizador duracion={item.duracion} onCompletar={() => setTimerFinalizado(true)} />

      <div className="mt-6">
        {completada ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-green-700 font-black text-xl">¡Actividad completada!</p>
            <p className="text-green-600 mt-1">Ganaste <strong>{item.puntos} puntos</strong></p>
          </div>
        ) : (
          <button
            onClick={handleCompletar}
            className={`w-full py-4 rounded-2xl font-black text-lg text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${item.colorBtn}`}
          >
            ✅ ¡Lo logré! +{item.puntos} puntos
          </button>
        )}
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function Actividades() {
  const [categoria, setCategoria] = useState('ninos');
  const [seleccionada, setSeleccionada] = useState(null);
  const [puntosTotales, setPuntosTotales] = useState(() => {
    return parseInt(localStorage.getItem('nexus_puntos') || '0');
  });
  const [completadas, setCompletadas] = useState(() => {
    return JSON.parse(localStorage.getItem('nexus_completadas') || '[]');
  });

  const agregarPuntos = (pts) => {
    if (seleccionada && !completadas.includes(seleccionada.id)) {
      const nuevos = puntosTotales + pts;
      const nuevasCompletadas = [...completadas, seleccionada.id];
      setPuntosTotales(nuevos);
      setCompletadas(nuevasCompletadas);
      localStorage.setItem('nexus_puntos', nuevos.toString());
      localStorage.setItem('nexus_completadas', JSON.stringify(nuevasCompletadas));
    }
  };

  const nivel = puntosTotales < 100 ? { nombre: 'Explorador', icono: '🌱', siguiente: 100 }
    : puntosTotales < 250 ? { nombre: 'Aventurero', icono: '⚡', siguiente: 250 }
    : puntosTotales < 500 ? { nombre: 'Campeón', icono: '🏆', siguiente: 500 }
    : { nombre: 'Leyenda', icono: '🌟', siguiente: puntosTotales };

  const progreso = Math.min((puntosTotales / nivel.siguiente) * 100, 100);

  if (seleccionada) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <DetalleActividad
          item={seleccionada}
          onVolver={() => setSeleccionada(null)}
          onCompletar={agregarPuntos}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors">
        ← Volver al inicio
      </Link>

      {/* Encabezado + Puntos */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Actividades</h1>
          <p className="text-slate-500 mt-1">Explora, aprende y gana puntos completando actividades</p>
        </div>

        {/* Panel de puntos */}
        <div className="bg-white border-2 border-slate-100 rounded-3xl p-5 shadow-sm min-w-64">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{nivel.icono}</span>
            <div>
              <p className="font-black text-slate-800">{nivel.nombre}</p>
              <p className="text-2xl font-black text-blue-600">{puntosTotales} pts</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progreso}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1 text-right">
            {puntosTotales} / {nivel.siguiente} pts para el siguiente nivel
          </p>
        </div>
      </div>

      {/* Tabs de categoría */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setCategoria('ninos')}
          className={`px-8 py-3 rounded-2xl font-black transition-all text-base ${
            categoria === 'ninos'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-slate-600 border-2 border-slate-100 hover:border-blue-200'
          }`}
        >
          🧒 Niños (6-12)
        </button>
        <button
          onClick={() => setCategoria('adolescentes')}
          className={`px-8 py-3 rounded-2xl font-black transition-all text-base ${
            categoria === 'adolescentes'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
              : 'bg-white text-slate-600 border-2 border-slate-100 hover:border-purple-200'
          }`}
        >
          🧑 Adolescentes (13-18)
        </button>
      </div>

      {/* Grilla de actividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contenidoActividades[categoria].map((item) => (
          <div key={item.id} className="relative">
            {completadas.includes(item.id) && (
              <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-black px-2 py-1 rounded-full">
                ✓ Completada
              </div>
            )}
            <TarjetaActividad item={item} onSeleccionar={setSeleccionada} />
          </div>
        ))}
      </div>

      {/* Contador actividades completadas */}
      <div className="mt-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100 text-center">
        <p className="text-slate-600 font-bold">
          Has completado <span className="text-blue-600 font-black text-xl">{completadas.length}</span> actividades
          {completadas.length >= 3 && ' 🎉 ¡Vas increíble!'}
          {completadas.length >= 6 && ' 🔥 ¡Eres una máquina!'}
          {completadas.length === 0 && ' — ¡Empieza la primera ahora!'}
        </p>
      </div>
    </div>
  );
}
