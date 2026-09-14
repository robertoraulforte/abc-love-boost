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
  {
    id: 56,
    text: "¿Qué indica una línea divisoria de carriles discontinua (punteada) de color blanco en la calzada?",
    options: [
      "Que la vía es de doble sentido de circulación",
      "Que se permite el cambio de carril o sobrepaso si la maniobra es segura",
      "Que está estrictamente prohibido cambiar de carril",
    ],
    correct: 1,
    explanation:
      "La línea blanca discontinua separa carriles de un mismo sentido y autoriza su transposición con precaución.",
  },
  {
    id: 57,
    text: "En una rotonda con más de un carril de circulación, ¿qué carril debe utilizar el conductor para tomar la última salida o realizar un giro en \"U\"?",
    options: [
      "El carril externo (derecho)",
      "Indistintamente cualquier carril",
      "El carril interno (izquierdo)",
    ],
    correct: 2,
    explanation:
      "Para maniobras que impliquen recorrer la mayor parte de la rotonda, se debe acceder y circular por el carril interno, desplazándose con anticipación hacia el externo para egresar.",
  },
  {
    id: 58,
    text: "¿Cuál es el significado de una línea transversal continua pintada de lado a lado en un carril antes de una encrucijada?",
    options: [
      "Indica la línea de detención obligatoria ante un semáforo, señal de PARE o paso peatonal",
      "Es una demarcación decorativa para delimitación de ciclovías",
      "Señala el lugar exacto a partir del cual se puede acelerar",
    ],
    correct: 0,
    explanation:
      "La línea transversal de detención delimita el punto donde el vehículo debe detenerse por completo cuando una señal o prioridad lo exija.",
  },
  {
    id: 59,
    text: "¿En cuál de las siguientes situaciones se pierde la prioridad de paso que tiene quien circula por la derecha?",
    options: [
      "Frente a vehículos de menor porte",
      "Al ingresar desde una vía de servicio o ante una señal explícita de Ceda el Paso o PARE",
      "Únicamente si el vehículo de la izquierda circula a mayor velocidad",
    ],
    correct: 1,
    explanation:
      "La prioridad de la derecha se pierde ante señalización específica o al incorporarse desde vías secundarias/servicios.",
  },
  {
    id: 60,
    text: "¿Qué elemento forma parte del equipamiento de Seguridad Activa de un vehículo?",
    options: [
      "El airbag o bolsa de aire",
      "El sistema de control de estabilidad (ESP)",
      "Los apoyacabezas",
    ],
    correct: 1,
    explanation:
      "La seguridad activa previene la ocurrencia de accidentes (ESP, frenos, luces). Airbags y apoyacabezas corresponden a la seguridad pasiva.",
  },
  {
    id: 61,
    text: "¿Cómo debe ser la posición correcta del apoyacabezas para cumplir de forma efectiva su función de seguridad pasiva?",
    options: [
      "Su borde superior debe quedar a la misma altura que la parte superior de la cabeza y a no más de 4 cm de la nuca",
      "Debe quedar colocado a la altura del cuello",
      "Debe quedar ajustado justo por debajo del nivel de las orejas",
    ],
    correct: 0,
    explanation:
      "Esta alineación evita el latigazo cervical ante un impacto por alcance trasero.",
  },
  {
    id: 62,
    text: "¿Qué función cumple el sistema de frenos ABS en una situación de frenada de emergencia?",
    options: [
      "Reducir la distancia de frenado exactamente a la mitad",
      "Evitar el bloqueo de las ruedas para mantener el control direccional",
      "Activar de forma automática las balizas del vehículo",
    ],
    correct: 1,
    explanation:
      "Al evitar que los neumáticos se bloqueen, permite al conductor maniobrar el volante para esquivar obstáculos mientras frena.",
  },
  {
    id: 63,
    text: "¿Está permitido circular con un vehículo utilizando la rueda de auxilio de tipo \"temporal\" o de tamaño reducido?",
    options: [
      "Sí, de forma indefinida si tiene la presión correcta",
      "Sí, pero como solución provisoria y respetando la velocidad máxima indicada por el fabricante (máx. 80 km/h)",
      "No, está totalmente prohibido",
    ],
    correct: 1,
    explanation:
      "Tienen menor adherencia y resistencia; su uso se limita al traslado hacia un taller para reparar la rueda titular.",
  },
  {
    id: 64,
    text: "Si durante la noche un vehículo en sentido contrario encandila con sus luces altas, ¿cuál es la conducta correcta?",
    options: [
      "Encender las luces altas propias para advertirle",
      "Dirigir la mirada hacia la línea de demarcación de la derecha (borde de calzada) y reducir la velocidad",
      "Pestañear las luces y acelerar para pasarlo rápido",
    ],
    correct: 1,
    explanation:
      "Guiar la vista al borde derecho evita la ceguera temporal por encandilamiento y permite mantener la trayectoria.",
  },
  {
    id: 65,
    text: "¿Qué debe hacer si al circular por una vía rápida sufre la pinchadura o reventón de un neumático trasero?",
    options: [
      "Frenar inmediatamente a fondo",
      "Sostener el volante con firmeza, mantener la trayectoria sin frenar bruscamente y desacelerar progresivamente",
      "Girar el volante hacia el lado del neumático dañado",
    ],
    correct: 1,
    explanation:
      "Frenar o girar de golpe ante un reventón desestabiliza la masa del vehículo provocando la pérdida total del control.",
  },
  {
    id: 66,
    text: "Si un vehículo pesado (camión/colectivo) que viaja delante de usted en ruta enciende el guiño IZQUIERDO, ¿qué le indica?",
    options: [
      "Que puede sobrepasarlo con seguridad",
      "Que NO debe intentarse el sobrepaso porque viene un vehículo de frente o va a maniobrar",
      "Que el camión se tirará a la banquina",
    ],
    correct: 1,
    explanation:
      "El guiño izquierdo del vehículo que precede advierte peligro para sobrepasar. El guiño derecho es el que indica posibilidad de paso.",
  },
  {
    id: 67,
    text: "Al aproximarse a un paso a nivel ferroviario sin barreras ni semáforo, ¿cuál es la conducta obligatoria?",
    options: [
      "Tocar la bocina y cruzar a velocidad normal",
      "Detener la marcha antes de las vías, mirar hacia ambos lados, escuchar y cruzar solo si está despejado",
      "Acelerar para atravesar la vía rápido",
    ],
    correct: 1,
    explanation:
      "Ante la ausencia de barrera automática, el ferrocarril tiene prioridad absoluta y requiere detención previa precautoria.",
  },
  {
    id: 68,
    text: "¿Cómo afecta la lluvia intensa a la distancia de frenado del vehículo?",
    options: [
      "La mantiene igual si las cubiertas son nuevas",
      "La reduce porque se enfrían los frenos",
      "La incrementa sustancialmente debido a la reducción de adherencia entre el neumático y el asfalto",
    ],
    correct: 2,
    explanation:
      "La película de agua disminuye el coeficiente de roce, exigiendo mayor espacio para lograr la detención completa.",
  },
  {
    id: 69,
    text: "Al circular con niebla densa, ¿qué luces deben encenderse obligatoriamente durante la marcha?",
    options: [
      "Luces altas",
      "Únicamente las balizas intermitentes",
      "Luces bajas y, de poseerlos, faros antiniebla",
    ],
    correct: 2,
    explanation:
      "Las luces altas rebotan en la niebla generando un \"efecto espejo\" que encandila al conductor.",
  },
  {
    id: 70,
    text: "¿Cuál es la distancia mínima que se debe mantener al adelantar a un ciclista en zona urbana o ruta?",
    options: [
      "0,5 metros",
      "1,5 metros",
      "1 metro",
    ],
    correct: 1,
    explanation:
      "Garantiza un margen lateral seguro para no desestabilizar al ciclista por la turbulencia de aire que genera el vehículo.",
  },
  {
    id: 71,
    text: "En caso de circular en motocicleta, ¿cuál es el impacto de llevar un acompañante?",
    options: [
      "Mejora la estabilidad en curvas",
      "Aumenta la distancia de frenado y desplaza el centro de gravedad hacia atrás, alterando la maniobrabilidad",
      "No genera ninguna variación si lleva casco",
    ],
    correct: 1,
    explanation:
      "El peso extra en la plaza trasera exige anticipar las frenadas y modificar la inclinación necesaria al girar.",
  },
  {
    id: 72,
    text: "¿Qué efecto físico produce el consumo de alcohol sobre el conductor, aun en concentraciones mínimas?",
    options: [
      "Aumenta la agudeza visual",
      "Reduce el campo de visión (efecto túnel) y disminuye la capacidad de juzgar distancias y velocidades",
      "Solo genera somnolencia",
    ],
    correct: 1,
    explanation:
      "Afecta el sistema nervioso central, ralentizando el tiempo de respuesta y reduciendo la visión periférica.",
  },
  {
    id: 73,
    text: "¿Cuál es la velocidad máxima permitida en autopistas para vehículos particulares, salvo señalización en contrario?",
    options: [
      "110 km/h",
      "130 km/h",
      "120 km/h",
    ],
    correct: 1,
    explanation:
      "Es el límite máximo estipulado por la Ley Nacional de Tránsito para automóviles y motocicletas en autopistas.",
  },
];

export const TOTAL_PREGUNTAS = 18;
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
