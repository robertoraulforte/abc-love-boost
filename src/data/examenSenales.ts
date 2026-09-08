import type { SignKey } from "@/data/examenTeorico";

export type SignQuestion = {
  id: number;
  pregunta: string;
  imagenUrl: string;
  /** Señal SVG local equivalente usada como fallback si la imagen externa no carga */
  fallbackSign?: SignKey;
  opciones: [string, string, string];
  /** índice 0 = A, 1 = B, 2 = C */
  correcta: 0 | 1 | 2;
  explicacion: string;
};

export const SIGN_QUESTIONS: SignQuestion[] = [
  {
    id: 1,
    pregunta: "¿Qué indica esta señal de tránsito?",
    imagenUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Argentina_road_sign_R-1.svg/500px-Argentina_road_sign_R-1.svg.png",
    fallbackSign: "pare",
    opciones: ["Ceda el paso", "Pare / Detención obligatoria", "Prohibido avanzar"],
    correcta: 1,
    explicacion:
      "La señal octogonal roja con la leyenda PARE exige la detención total del vehículo antes de cruzar la encrucijada.",
  },
  {
    id: 2,
    pregunta: "¿Qué indica esta señal vial?",
    imagenUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Argentina_road_sign_R-2.svg/500px-Argentina_road_sign_R-2.svg.png",
    fallbackSign: "ceda",
    opciones: [
      "Ceda el paso",
      "Prioridad de paso al que viene de la izquierda",
      "Atención: Semáforo adelante",
    ],
    correcta: 0,
    explicacion:
      "Indica la obligación de ceder el paso a los vehículos que circulan por la vía a la que se ingresa o cruza.",
  },
  {
    id: 3,
    pregunta: "¿Cuál es el significado de esta señal?",
    imagenUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Argentina_road_sign_P-11%28a%29.svg/500px-Argentina_road_sign_P-11%28a%29.svg.png",
    fallbackSign: "zona-escolar",
    opciones: [
      "Prohibido peatones",
      "Zona peatonal exclusiva",
      "Proximidad de cruce peatonal / Escolar",
    ],
    correcta: 2,
    explicacion:
      "Es una señal preventiva que advierte sobre la presencia o cruce frecuente de peatones o zona escolar.",
  },
  {
    id: 4,
    pregunta: "¿Qué indica esta señal amarilla en el camino?",
    imagenUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Argentina_road_sign_P-2.svg/500px-Argentina_road_sign_P-2.svg.png",
    opciones: [
      "Curva peligrosa a la derecha",
      "Camino sinuoso",
      "Giro obligatorio a la derecha",
    ],
    correcta: 0,
    explicacion:
      "Es una señal preventiva que advierte con antelación la presencia de una curva pronunciada en la calzada.",
  },
  {
    id: 5,
    pregunta:
      "¿Qué establece la siguiente señal circular con fondo blanco y borde rojo?",
    imagenUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Argentina_road_sign_R-15.svg/500px-Argentina_road_sign_R-15.svg.png",
    fallbackSign: "velocidad-max",
    opciones: [
      "Velocidad mínima aconsejada",
      "Límite máximo de velocidad permitida",
      "Distancia mínima entre vehículos",
    ],
    correcta: 1,
    explicacion:
      "Es una señal reglamentaria o prescriptiva que fija la velocidad máxima absoluta a la que se puede circular en dicho tramo.",
  },
];

export const SIGN_PORCENTAJE_APROBACION = 80;
