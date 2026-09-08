export type SignKey =
  | "ceda"
  | "pare"
  | "contramano"
  | "no-estacionar"
  | "velocidad-max"
  | "no-girar-izq"
  | "rotonda"
  | "cruz-san-andres"
  | "calzada-estrecha"
  | "zona-escolar"
  | "no-bicicletas"
  | "direccion-obligatoria"
  | "no-adelantarse"
  | "curva-peligrosa"
  | "cruce-peatonal";

export type Question = {
  id: number;
  text: string;
  options: [string, string, string];
  /** index 0 = A, 1 = B, 2 = C */
  correct: 0 | 1 | 2;
  sign?: SignKey;
  /** Explicación teórica mostrada al responder */
  explanation?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Cuál es la velocidad máxima en avenidas, salvo señalización que indique lo contrario?",
    options: ["40 km/h", "60 km/h", "80 km/h"],
    correct: 1,
  },
  {
    id: 2,
    text: "¿Cuál es la velocidad máxima permitida en calles?",
    options: ["60 km/h", "50 km/h", "40 km/h"],
    correct: 2,
  },
  {
    id: 3,
    text: "¿Quién tiene prioridad en una rotonda?",
    options: [
      "El vehículo que circula por la rotonda por sobre el que intenta ingresar",
      "El que intenta ingresar a la rotonda",
      "El que viene por la derecha siempre",
    ],
    correct: 0,
  },
  {
    id: 4,
    text: "Con respecto a la alcoholemia, ¿cuál es la única tasa segura?",
    options: ["0,50", "0,00", "0,20"],
    correct: 1,
  },
  {
    id: 5,
    text: "¿Cuál es la distancia de seguridad que debemos llevar con el vehículo que tenemos adelante?",
    options: ["1 segundo", "2 segundos", "5 metros"],
    correct: 1,
  },
  {
    id: 6,
    text: "¿Cuánto es el tiempo de reacción promedio entre la recepción de la información y la actuación concreta por parte del conductor?",
    options: ["3/4 de segundo", "2 segundos", "1/4 de segundo"],
    correct: 0,
  },
  {
    id: 7,
    text: "¿La licencia de conducir caduca producido el cambio de jurisdicción?",
    options: ["No, nunca caduca", "Sí, a los 90 días", "Sí, a los 30 días"],
    correct: 1,
  },
  {
    id: 8,
    text: "El hidroplaneo hace que las ruedas pierdan contacto con el asfalto. ¿A qué velocidad se empieza a producir este fenómeno en días de lluvia?",
    options: ["30 km/h", "50 km/h", "80 km/h"],
    correct: 1,
  },
  {
    id: 9,
    text: "¿A qué distancia debemos anticipar y señalar la maniobra cuando queremos girar o cambiar de carril?",
    options: ["10 metros antes", "5 metros antes", "30 metros antes"],
    correct: 2,
  },
  {
    id: 10,
    text: "¿A qué categoría debo ampliar si tengo un automóvil y anexo un trailer?",
    options: ["Categoría B1", "Categoría B2", "Categoría C1"],
    correct: 1,
  },
  {
    id: 11,
    text: "¿Cuál es la velocidad máxima a respetar al pasar por una escuela?",
    options: ["40 km/h", "30 km/h", "20 km/h"],
    correct: 2,
  },
  {
    id: 12,
    text: "Las ambulancias u otros vehículos de emergencias tienen prioridad de paso:",
    options: ["Siempre, estén o no en servicio", "Solo en los casos en que se encuentren en servicio", "Nunca"],
    correct: 1,
  },
  {
    id: 13,
    text: "¿Cuál es la distancia aproximada de frenado a 40 km/h en piso seco?",
    options: ["8 metros", "16 metros", "30 metros"],
    correct: 1,
  },
  {
    id: 14,
    text: "Fuerza centrífuga: al doblar hacia la derecha, ¿hacia dónde empuja el auto?",
    options: [
      "La fuerza centrífuga empuja el auto hacia la izquierda",
      "La fuerza centrífuga empuja el auto hacia la derecha",
      "No genera ningún efecto sobre el vehículo",
    ],
    correct: 0,
  },
  {
    id: 15,
    text: "¿Qué autoriza a conducir una licencia Categoría B1?",
    options: [
      "Automóviles, utilitarios, camionetas y casas rodantes motorizadas hasta 3500 kg",
      "Motocicletas de cualquier cilindrada",
      "Camiones de más de 3500 kg",
    ],
    correct: 0,
  },
  {
    id: 16,
    text: "Al llegar a una encrucijada y querer girar a la izquierda o derecha, ¿quién tiene prioridad?",
    options: [
      "El que dobla siempre tiene prioridad",
      "El que llegó primero a la encrucijada",
      "El que dobla espera: la prioridad la tiene el que sigue recto",
    ],
    correct: 2,
  },
  {
    id: 17,
    text: "No respetar una señal informativa:",
    options: ["Es una infracción grave", "Es una infracción leve", "No es una infracción"],
    correct: 2,
  },
  {
    id: 18,
    text: "¿Cómo indico al vehículo que viene detrás que me puede sobrepasar?",
    options: ["Con las balizas", "Señalizando con el guiñe izquierdo", "Señalizando con el guiñe derecho"],
    correct: 2,
  },
  {
    id: 19,
    text: "¿Cuál es la velocidad mínima para circular en calles?",
    options: ["10 km/h", "30 km/h", "20 km/h"],
    correct: 2,
  },
  {
    id: 20,
    text: "¿A qué número telefónico se debe llamar ante una emergencia médica o siniestro vial?",
    options: ["911", "107", "100"],
    correct: 1,
  },
  {
    id: 21,
    text: "¿En qué circunstancias se puede sobrepasar a un vehículo por la derecha?",
    options: [
      "Cuando el vehículo anterior ha indicado su intención de girar o detenerse a su izquierda",
      "Cuando circula muy lento",
      "Nunca, bajo ninguna circunstancia",
    ],
    correct: 0,
  },
  {
    id: 22,
    text: "En la vía pública, ¿cuál es el orden de prioridad que se debe respetar?",
    options: [
      "Primero las indicaciones de la autoridad competente, y luego las señales de tránsito",
      "Primero las señales de tránsito y luego la autoridad",
      "Primero las marcas en el pavimento",
    ],
    correct: 0,
  },
  {
    id: 23,
    text: "Ante una señal de PARE, usted debe:",
    options: [
      "Reducir la velocidad y continuar",
      "Detener por completo la marcha, reanudándola una vez que sea seguro",
      "Tocar bocina y avanzar",
    ],
    correct: 1,
  },
  {
    id: 24,
    text: "La prioridad de quien circula por la derecha es:",
    options: ["Relativa", "Absoluta, salvo las excepciones previstas", "Inexistente"],
    correct: 1,
  },
  {
    id: 25,
    text: "Al salir de una vía de tierra e ingresar a una pavimentada, ¿quién tiene prioridad?",
    options: [
      "Tiene prioridad quien sale de la vía de tierra",
      "Tiene prioridad quien circula por la vía pavimentada",
      "El que llegue primero",
    ],
    correct: 1,
  },
  {
    id: 26,
    text: "En una encrucijada urbana sin semáforo, la velocidad precautoria nunca debe superar:",
    options: ["40 km/h", "30 km/h", "20 km/h"],
    correct: 1,
  },
  {
    id: 27,
    text: "En un vehículo con frenos ABS, ante una frenada de emergencia:",
    options: [
      "El sistema ayuda a evitar el bloqueo de las ruedas",
      "Se deben bombear los frenos",
      "El vehículo frena solo sin intervención",
    ],
    correct: 0,
  },
  {
    id: 28,
    text: "La profundidad mínima de la banda de rodamiento indicada para un automóvil es:",
    options: ["0,6 mm", "1,0 mm", "1,6 mm"],
    correct: 2,
  },
  {
    id: 29,
    text: "La seguridad pasiva está destinada principalmente a:",
    options: [
      "Evitar que el siniestro ocurra",
      "Reducir las consecuencias de un siniestro una vez producido",
      "Mejorar el rendimiento del motor",
    ],
    correct: 1,
  },
  {
    id: 30,
    text: "¿Cuál de estos elementos corresponde a la seguridad pasiva del vehículo?",
    options: ["Cinturón de seguridad", "Frenos ABS", "Luces de giro"],
    correct: 0,
  },
  {
    id: 31,
    text: "El uso de las sillitas (Sistemas de Retención Infantil) para menores puede reducir las lesiones:",
    options: ["Hasta un 20 %", "Hasta un 45 %", "Hasta un 70 %"],
    correct: 2,
  },
  {
    id: 32,
    text: "Para atender una llamada o utilizar el teléfono celular durante la conducción se debe:",
    options: [
      "Usar el manos libres a cualquier velocidad",
      "Detenerse al costado de la vía o en un lugar apropiado",
      "Reducir la velocidad y atender",
    ],
    correct: 1,
  },
  {
    id: 33,
    text: "Si vas a estacionar y hay un vehículo circulando detrás tuyo:",
    options: [
      "Encendés las balizas con anticipación para advertir la maniobra",
      "Frenás de golpe y estacionás",
      "Tocás bocina",
    ],
    correct: 0,
  },
  {
    id: 34,
    text: "El uso de las luces bajas en rutas nacionales y provinciales es:",
    options: ["Obligatorio solo de noche", "Obligatorio de noche y de día", "Opcional"],
    correct: 1,
  },
  {
    id: 35,
    text: "¿Qué indica una línea continua amarilla doble o simple en el medio de la calzada?",
    options: [
      "Permite el adelantamiento con precaución",
      "Prohíbe el adelantamiento y traspaso de carril",
      "Indica zona de estacionamiento",
    ],
    correct: 1,
  },
  {
    id: 36,
    text: "¿Cuál es la prioridad de paso ante un peatón que cruza por la senda peatonal?",
    options: [
      "El vehículo debe detenerse y ceder el paso al peatón",
      "El vehículo tiene prioridad",
      "Depende del semáforo únicamente",
    ],
    correct: 0,
  },
  {
    id: 37,
    text: "¿Cuánto dura la condición de principiante al sacar la licencia por primera vez?",
    options: ["3 meses", "6 meses", "12 meses"],
    correct: 1,
  },
  {
    id: 38,
    text: "¿Qué indica esta señal?",
    options: ["Ceda el paso", "Pare", "Calzada estrecha"],
    correct: 0,
    sign: "ceda",
  },
  {
    id: 40,
    text: "¿Qué indica esta señal?",
    options: ["Contramano", "Dirección obligatoria", "No avanzar"],
    correct: 0,
    sign: "contramano",
  },
  {
    id: 41,
    text: "¿Qué indica esta señal?",
    options: ["Prohibido detenerse", "Prohibido estacionar", "Estacionamiento exclusivo"],
    correct: 1,
    sign: "no-estacionar",
  },
  {
    id: 42,
    text: "¿Qué indica esta señal?",
    options: ["Velocidad mínima", "Velocidad máxima", "Velocidad sugerida"],
    correct: 1,
    sign: "velocidad-max",
  },
  {
    id: 43,
    text: "¿Qué indica esta señal?",
    options: ["Prohibido girar a la izquierda", "Giro obligatorio", "Prohibido retomar"],
    correct: 0,
    sign: "no-girar-izq",
  },
  {
    id: 44,
    text: "¿Qué indica esta señal?",
    options: ["Rotonda", "Curva peligrosa", "Camino dividido"],
    correct: 0,
    sign: "rotonda",
  },
  {
    id: 45,
    text: "¿Qué indica esta señal?",
    options: ["Cruzamiento peatonal", "Paso a nivel / Cruz de San Andrés", "Atención peligro"],
    correct: 1,
    sign: "cruz-san-andres",
  },
  {
    id: 46,
    text: "¿Qué indica esta señal?",
    options: ["Calzada estrecha", "Puente", "Conservar la derecha"],
    correct: 0,
    sign: "calzada-estrecha",
  },
  {
    id: 47,
    text: "¿Qué indica esta señal?",
    options: ["Paso peatonal", "Zona escolar", "Niños jugando"],
    correct: 1,
    sign: "zona-escolar",
  },
  {
    id: 48,
    text: "¿Qué indica esta señal?",
    options: ["Ciclovía", "Prohibido circular bicicletas", "Cuidado ciclistas"],
    correct: 1,
    sign: "no-bicicletas",
  },
  {
    id: 49,
    text: "¿Qué indica esta señal?",
    options: ["Dirección obligatoria", "Giro permitido", "Sentido único"],
    correct: 0,
    sign: "direccion-obligatoria",
  },
  {
    id: 50,
    text: "¿Qué indica esta señal?",
    options: ["No adelantarse", "Conservar carril", "Prohibido camiones"],
    correct: 0,
    sign: "no-adelantarse",
  },
  {
    id: 52,
    text: "¿Qué indica esta señal vial?",
    options: [
      "Ceda el paso",
      "Prioridad de paso al que viene de la izquierda",
      "Atención: semáforo adelante",
    ],
    correct: 0,
    sign: "ceda",
    explanation:
      "Indica la obligación de ceder el paso a los vehículos que circulan por la vía a la que se ingresa o cruza.",
  },
  {
    id: 53,
    text: "¿Cuál es el significado de esta señal?",
    options: ["Prohibido peatones", "Zona peatonal exclusiva", "Proximidad de cruce peatonal"],
    correct: 2,
    sign: "cruce-peatonal",
    explanation:
      "Es una señal preventiva que advierte sobre la presencia o cruce frecuente de peatones en la calzada.",
  },
  {
    id: 54,
    text: "¿Qué indica esta señal amarilla en el camino?",
    options: ["Curva peligrosa a la derecha", "Camino sinuoso", "Giro obligatorio a la derecha"],
    correct: 0,
    sign: "curva-peligrosa",
    explanation:
      "Es una señal preventiva que advierte con antelación la presencia de una curva pronunciada en la calzada.",
  },
  {
    id: 55,
    text: "¿Qué establece esta señal circular con fondo blanco y borde rojo?",
    options: [
      "Velocidad mínima aconsejada",
      "Límite máximo de velocidad permitida",
      "Distancia mínima entre vehículos",
    ],
    correct: 1,
    sign: "velocidad-max",
    explanation:
      "Es una señal reglamentaria que fija la velocidad máxima absoluta a la que se puede circular en ese tramo.",
  },
];

export const TOTAL_PREGUNTAS = 15;
export const TOTAL_PREGUNTAS_SENALES = 10;
export const PORCENTAJE_APROBACION = 80;

export type ExamMode = "completo" | "senales";

function shuffle(list: Question[]): Question[] {
  const pool = [...list];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

export function pickRandomQuestions(
  count = TOTAL_PREGUNTAS,
  mode: ExamMode = "completo",
): Question[] {
  const base = mode === "senales" ? QUESTIONS.filter((q) => q.sign) : QUESTIONS;
  return shuffle(base).slice(0, Math.min(count, base.length));
}
