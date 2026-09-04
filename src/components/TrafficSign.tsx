import type { SignKey } from "@/data/examenTeorico";

const RED = "#d92121";
const BLUE = "#1155cc";
const YELLOW = "#f2c200";
const WHITE = "#ffffff";
const BLACK = "#111111";

const TrafficSign = ({ sign, className = "" }: { sign: SignKey; className?: string }) => {
  const common = {
    viewBox: "0 0 120 120",
    className: `mx-auto h-auto w-full max-w-[180px] sm:max-w-[220px] ${className}`,
    role: "img",
    "aria-label": "Señal de tránsito",
  } as const;

  switch (sign) {
    // CEDA EL PASO — triángulo invertido blanco con borde rojo
    case "ceda":
      return (
        <svg {...common}>
          <polygon
            points="60,110 8,14 112,14"
            fill={WHITE}
            stroke={RED}
            strokeWidth="14"
            strokeLinejoin="round"
          />
        </svg>
      );
    // PARE — octágono rojo, borde blanco, texto PARE
    case "pare":
      return (
        <svg {...common}>
          <polygon
            points="45,6 75,6 114,45 114,75 75,114 45,114 6,75 6,45"
            fill={RED}
            stroke={WHITE}
            strokeWidth="5"
          />
          <polygon
            points="45,14 75,14 106,45 106,75 75,106 45,106 14,75 14,45"
            fill="none"
            stroke={WHITE}
            strokeWidth="2"
          />
          <text x="60" y="72" textAnchor="middle" fontSize="26" fontWeight="700" fill={WHITE}>
            PARE
          </text>
        </svg>
      );
    // CONTRAMANO — círculo rojo con franja horizontal blanca
    case "contramano":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="54" fill={RED} stroke={BLACK} strokeWidth="2" />
          <rect x="26" y="50" width="68" height="20" rx="2" fill={WHITE} />
        </svg>
      );
    // PROHIBIDO ESTACIONAR — fondo azul, borde rojo, diagonal roja, E blanca
    case "no-estacionar":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={RED} strokeWidth="10" />
          <text x="60" y="78" textAnchor="middle" fontSize="50" fontWeight="700" fill={WHITE}>
            E
          </text>
          <line x1="26" y1="94" x2="94" y2="26" stroke={RED} strokeWidth="9" />
        </svg>
      );
    // VELOCIDAD MÁXIMA — círculo blanco, borde rojo, número negro
    case "velocidad-max":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="12" />
          <text x="60" y="76" textAnchor="middle" fontSize="40" fontWeight="700" fill={BLACK}>
            60
          </text>
        </svg>
      );
    // PROHIBIDO GIRAR A LA IZQUIERDA — flecha negra a la izquierda tachada en rojo
    case "no-girar-izq":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <path d="M78 94 L78 56 L48 56" stroke={BLACK} strokeWidth="10" fill="none" />
          <polygon points="46,38 26,56 46,74" fill={BLACK} />
          <line x1="26" y1="94" x2="94" y2="26" stroke={RED} strokeWidth="9" />
        </svg>
      );
    // ROTONDA PREVENTIVA — rombo amarillo con flechas circulares negras
    case "rotonda":
      return (
        <svg {...common}>
          <rect x="60" y="6" width="76" height="76" transform="rotate(45 60 60)" fill={YELLOW} stroke={BLACK} strokeWidth="5" />
          <path d="M60 34 A26 26 0 0 1 82 48" stroke={BLACK} strokeWidth="7" fill="none" />
          <polygon points="88,38 90,58 70,52" fill={BLACK} />
          <path d="M84 56 A26 26 0 0 1 60 86" stroke={BLACK} strokeWidth="7" fill="none" />
          <polygon points="50,90 72,90 62,72" fill={BLACK} />
          <path d="M52 80 A26 26 0 0 1 40 46" stroke={BLACK} strokeWidth="7" fill="none" />
          <polygon points="30,52 46,38 50,58" fill={BLACK} />
        </svg>
      );
    // CRUZ DE SAN ANDRÉS — aspa blanca con borde rojo
    case "cruz-san-andres":
      return (
        <svg {...common}>
          <line x1="20" y1="20" x2="100" y2="100" stroke={WHITE} strokeWidth="18" />
          <line x1="100" y1="20" x2="20" y2="100" stroke={WHITE} strokeWidth="18" />
          <line x1="20" y1="20" x2="100" y2="100" stroke={RED} strokeWidth="18" strokeDasharray="none" opacity="0" />
          <path d="M20 12 L108 92 M28 12 L108 84" stroke="none" />
          <g stroke={RED} strokeWidth="3">
            <line x1="20" y1="9" x2="111" y2="100" />
            <line x1="9" y1="20" x2="100" y2="111" />
            <line x1="111" y1="20" x2="20" y2="111" />
            <line x1="100" y1="9" x2="9" y2="100" />
          </g>
        </svg>
      );
    // CALZADA ESTRECHA — rombo amarillo, silueta que se angosta
    case "calzada-estrecha":
      return (
        <svg {...common}>
          <rect x="60" y="6" width="76" height="76" transform="rotate(45 60 60)" fill={YELLOW} stroke={BLACK} strokeWidth="5" />
          <polygon points="42,30 54,30 49,60 54,90 42,90 47,60" fill={BLACK} />
          <polygon points="78,30 66,30 71,60 66,90 78,90 73,60" fill={BLACK} />
        </svg>
      );
    // ZONA ESCOLAR — rombo amarillo con dos niños
    case "zona-escolar":
      return (
        <svg {...common}>
          <rect x="60" y="6" width="76" height="76" transform="rotate(45 60 60)" fill={YELLOW} stroke={BLACK} strokeWidth="5" />
          <circle cx="48" cy="42" r="7" fill={BLACK} />
          <path d="M48 50 L48 74 M48 58 L36 66 M48 58 L60 66 M48 74 L40 90 M48 74 L56 90" stroke={BLACK} strokeWidth="5" fill="none" />
          <circle cx="76" cy="48" r="6" fill={BLACK} />
          <path d="M76 55 L76 76 M76 62 L66 69 M76 76 L70 90 M76 76 L82 90" stroke={BLACK} strokeWidth="5" fill="none" />
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
    // NO ADELANTARSE — dos autos a la par (rojo izquierda, negro derecha), borde rojo
    case "no-adelantarse":
      return (
        <svg {...common}>
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <g>
            <rect x="28" y="44" width="24" height="38" rx="4" fill={RED} />
            <rect x="30" y="82" width="5" height="10" fill={RED} />
            <rect x="45" y="82" width="5" height="10" fill={RED} />
            <rect x="30" y="28" width="5" height="10" fill={RED} />
            <rect x="45" y="28" width="5" height="10" fill={RED} />
          </g>
          <g>
            <rect x="68" y="44" width="24" height="38" rx="4" fill={BLACK} />
            <rect x="70" y="82" width="5" height="10" fill={BLACK} />
            <rect x="85" y="82" width="5" height="10" fill={BLACK} />
            <rect x="70" y="28" width="5" height="10" fill={BLACK} />
            <rect x="85" y="28" width="5" height="10" fill={BLACK} />
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default TrafficSign;
