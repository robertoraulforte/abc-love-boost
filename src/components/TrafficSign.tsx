import type { SignKey } from "@/data/examenTeorico";

const RED = "#d92121";
const BLUE = "#1155cc";
const YELLOW = "#f2c200";
const WHITE = "#ffffff";
const BLACK = "#111111";

const TrafficSign = ({ sign, className = "" }: { sign: SignKey; className?: string }) => {
  const common = {
    viewBox: "0 0 120 120",
    preserveAspectRatio: "xMidYMid meet",
    className: `aspect-square h-full w-full object-contain ${className}`,
    role: "img",
    "aria-label": "Señal de tránsito",
  } as const;

  const PreventiveDiamond = () => (
    <>
      <polygon
        points="60,4 116,60 60,116 4,60"
        fill={YELLOW}
        stroke={BLACK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon
        points="60,10 110,60 60,110 10,60"
        fill="none"
        stroke={BLACK}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </>
  );

  switch (sign) {
    // CEDA EL PASO — triángulo invertido blanco con borde rojo
    case "ceda":
      return (
        <svg {...common}>
          <polygon
            points="60,111 7,14 113,14"
            fill={WHITE}
            stroke={RED}
            strokeWidth="11"
            strokeLinejoin="round"
          />
          <polygon points="60,101 17,22 103,22" fill="none" stroke={WHITE} strokeWidth="2" />
        </svg>
      );
    // PARE — octágono rojo, borde blanco, texto PARE
    case "pare":
      return (
        <svg {...common}>
          <polygon points="43,5 77,5 115,43 115,77 77,115 43,115 5,77 5,43" fill={RED} stroke={WHITE} strokeWidth="3" />
          <polygon
            points="45,11 75,11 109,45 109,75 75,109 45,109 11,75 11,45"
            fill="none"
            stroke={WHITE}
            strokeWidth="2"
          />
          <text x="60" y="70" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="800" fill={WHITE}>
            PARE
          </text>
        </svg>
      );
    // CONTRAMANO — círculo rojo con franja horizontal blanca
    case "contramano":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="54" fill={RED} stroke={WHITE} strokeWidth="2" />
          <rect x="24" y="49" width="72" height="22" rx="2" fill={WHITE} />
        </svg>
      );
    // PROHIBIDO ESTACIONAR — fondo azul, borde rojo, diagonal roja, E blanca
    case "no-estacionar":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={RED} strokeWidth="9" />
          <text x="60" y="61" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="50" fontWeight="700" fill={WHITE}>
            E
          </text>
          <line x1="26" y1="94" x2="94" y2="26" stroke={RED} strokeWidth="9" />
        </svg>
      );
    // VELOCIDAD MÁXIMA — círculo blanco, borde rojo, número negro
    case "velocidad-max":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <text x="60" y="61" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="700" fill={BLACK}>
            60
          </text>
        </svg>
      );
    // PROHIBIDO GIRAR A LA IZQUIERDA — flecha negra a la izquierda tachada en rojo
    case "no-girar-izq":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <path d="M79 94 L79 58 Q79 44 65 44 L45 44" stroke={BLACK} strokeWidth="9" strokeLinecap="round" fill="none" />
          <polygon points="47,27 26,44 47,61" fill={BLACK} />
          <line x1="26" y1="94" x2="94" y2="26" stroke={RED} strokeWidth="9" />
        </svg>
      );
    // ROTONDA PREVENTIVA — rombo amarillo con flechas circulares negras
    case "rotonda":
      return (
        <svg {...common}>
          <PreventiveDiamond />
          <path d="M48 39 A27 27 0 0 1 80 47" stroke={BLACK} strokeWidth="6" strokeLinecap="round" fill="none" />
          <polygon points="84,38 87,58 68,51" fill={BLACK} />
          <path d="M83 62 A27 27 0 0 1 62 86" stroke={BLACK} strokeWidth="6" strokeLinecap="round" fill="none" />
          <polygon points="51,89 71,90 62,72" fill={BLACK} />
          <path d="M51 82 A27 27 0 0 1 37 51" stroke={BLACK} strokeWidth="6" strokeLinecap="round" fill="none" />
          <polygon points="29,53 44,38 49,58" fill={BLACK} />
        </svg>
      );
    // CRUZ DE SAN ANDRÉS — aspa blanca con borde rojo
    case "cruz-san-andres":
      return (
        <svg {...common}>
          <g stroke={RED} strokeWidth="22" strokeLinecap="square">
            <line x1="22" y1="22" x2="98" y2="98" />
            <line x1="98" y1="22" x2="22" y2="98" />
          </g>
          <g stroke={WHITE} strokeWidth="14" strokeLinecap="square">
            <line x1="22" y1="22" x2="98" y2="98" />
            <line x1="98" y1="22" x2="22" y2="98" />
          </g>
        </svg>
      );
    // CALZADA ESTRECHA — rombo amarillo, silueta que se angosta
    case "calzada-estrecha":
      return (
        <svg {...common}>
          <PreventiveDiamond />
          <path d="M39 31 H50 L55 53 V89 H45 V55 Z" fill={BLACK} />
          <path d="M81 31 H70 L65 53 V89 H75 V55 Z" fill={BLACK} />
        </svg>
      );
    // ZONA ESCOLAR — rombo amarillo con dos escolares; el mayor lleva cartera
    case "zona-escolar":
      return (
        <svg {...common}>
          <PreventiveDiamond />
          <g fill={BLACK} stroke={BLACK} strokeLinecap="round" strokeLinejoin="round">
            {/* Escolar mayor caminando y guiando al menor */}
            <circle cx="49" cy="35" r="6" stroke="none" />
            <path d="M48 44 L45 64 L37 78 M45 64 L55 82 M46 49 L35 59 M46 49 L60 57" strokeWidth="5.5" fill="none" />
            {/* Escolar menor */}
            <circle cx="70" cy="44" r="5" stroke="none" />
            <path d="M69 51 L66 67 L59 80 M66 67 L75 80 M68 55 L59 58 M68 55 L78 63" strokeWidth="5" fill="none" />
            {/* Cartera escolar reglamentaria, sostenida por el escolar mayor */}
            <path d="M28 61 H40 V75 H28 Z" strokeWidth="2.5" />
            <path d="M31 61 V57 Q34 53 37 57 V61" strokeWidth="2.5" fill="none" />
            <path d="M35 59 L35 66" strokeWidth="3" fill="none" />
          </g>
        </svg>
      );
    // PROHIBIDO CIRCULAR BICICLETAS — bicicleta negra tachada, borde rojo
    case "no-bicicletas":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <circle cx="42" cy="76" r="13" fill="none" stroke={BLACK} strokeWidth="5" />
          <circle cx="82" cy="76" r="13" fill="none" stroke={BLACK} strokeWidth="5" />
          <path d="M42 76 L58 76 L70 52 L82 76 M70 52 L62 52" stroke={BLACK} strokeWidth="5" fill="none" />
          <line x1="26" y1="94" x2="94" y2="26" stroke={RED} strokeWidth="9" />
        </svg>
      );
    // DIRECCIÓN OBLIGATORIA — círculo azul, flecha blanca
    case "direccion-obligatoria":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={WHITE} strokeWidth="5" />
          <path d="M60 94 L60 44" stroke={WHITE} strokeWidth="11" />
          <polygon points="60,22 38,50 82,50" fill={WHITE} />
        </svg>
      );
    // NO ADELANTARSE — vista frontal reglamentaria de dos automóviles
    case "no-adelantarse":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <g fill={RED}>
            <path d="M25 61 L30 46 Q32 40 38 40 H47 Q53 40 55 46 L60 61 V82 H25 Z" />
            <rect x="21" y="61" width="7" height="12" rx="2" />
            <rect x="57" y="61" width="7" height="12" rx="2" />
            <path d="M34 47 H46 Q49 47 50 51 L53 60 H29 L32 51 Q33 47 34 47 Z" fill={WHITE} />
            <rect x="29" y="79" width="8" height="9" rx="2" />
            <rect x="49" y="79" width="8" height="9" rx="2" />
            <circle cx="34" cy="69" r="4" fill={WHITE} />
            <circle cx="51" cy="69" r="4" fill={WHITE} />
          </g>
          <g fill={BLACK}>
            <path d="M62 61 L67 46 Q69 40 75 40 H84 Q90 40 92 46 L97 61 V82 H62 Z" />
            <rect x="58" y="61" width="7" height="12" rx="2" />
            <rect x="94" y="61" width="7" height="12" rx="2" />
            <path d="M71 47 H83 Q86 47 87 51 L90 60 H66 L69 51 Q70 47 71 47 Z" fill={WHITE} />
            <rect x="66" y="79" width="8" height="9" rx="2" />
            <rect x="86" y="79" width="8" height="9" rx="2" />
            <circle cx="71" cy="69" r="4" fill={WHITE} />
            <circle cx="88" cy="69" r="4" fill={WHITE} />
          </g>
        </svg>
      );
    // CURVA PELIGROSA A LA DERECHA — rombo amarillo con flecha curva negra
    case "curva-peligrosa":
      return (
        <svg {...common}>
          <PreventiveDiamond />
          <path
            d="M52 92 L52 66 Q52 44 72 40"
            stroke={BLACK}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="66,24 92,40 66,56" fill={BLACK} />
        </svg>
      );
    // CRUCE PEATONAL — rombo amarillo con peatón y senda
    case "cruce-peatonal":
      return (
        <svg {...common}>
          <PreventiveDiamond />
          <circle cx="58" cy="34" r="7" fill={BLACK} />
          <path
            d="M58 43 L58 66 M58 48 L44 56 M58 48 L73 56 M58 66 L48 86 M58 66 L69 86"
            stroke={BLACK}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <g fill={BLACK}>
            <rect x="30" y="92" width="60" height="4" />
            <rect x="30" y="99" width="60" height="4" />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default TrafficSign;
