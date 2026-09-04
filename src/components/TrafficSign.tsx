import type { SignKey } from "@/data/examenTeorico";

const RED = "#d92121";
const BLUE = "#1155cc";
const YELLOW = "#f2c200";
const WHITE = "#ffffff";
const BLACK = "#111111";

const TrafficSign = ({ sign, className = "" }: { sign: SignKey; className?: string }) => {
  const common = { viewBox: "0 0 120 120", className: `h-36 w-36 md:h-44 md:w-44 ${className}` };

  switch (sign) {
    case "ceda":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <polygon points="60,108 6,14 114,14" fill={WHITE} stroke={RED} strokeWidth="12" strokeLinejoin="round" />
        </svg>
      );
    case "pare":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <polygon
            points="38,8 82,8 112,38 112,82 82,112 38,112 8,82 8,38"
            fill={RED}
            stroke={WHITE}
            strokeWidth="6"
          />
          <text x="60" y="72" textAnchor="middle" fontSize="30" fontWeight="700" fill={WHITE}>
            PARE
          </text>
        </svg>
      );
    case "contramano":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={RED} stroke={WHITE} strokeWidth="6" />
          <rect x="26" y="52" width="68" height="16" fill={WHITE} />
        </svg>
      );
    case "no-estacionar":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={RED} strokeWidth="10" />
          <text x="60" y="76" textAnchor="middle" fontSize="52" fontWeight="700" fill={WHITE}>
            E
          </text>
          <line x1="24" y1="96" x2="96" y2="24" stroke={RED} strokeWidth="10" />
        </svg>
      );
    case "velocidad-max":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="12" />
          <text x="60" y="74" textAnchor="middle" fontSize="38" fontWeight="700" fill={BLACK}>
            60
          </text>
        </svg>
      );
    case "no-girar-izq":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <path d="M74 92 L74 52 L44 52" stroke={BLACK} strokeWidth="9" fill="none" />
          <polygon points="44,38 26,52 44,66" fill={BLACK} />
          <line x1="24" y1="96" x2="96" y2="24" stroke={RED} strokeWidth="10" />
        </svg>
      );
    case "rotonda":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={WHITE} strokeWidth="6" />
          <circle cx="60" cy="60" r="26" fill="none" stroke={WHITE} strokeWidth="8" />
          <polygon points="60,20 50,36 70,36" fill={WHITE} />
        </svg>
      );
    case "cruz-san-andres":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <line x1="14" y1="14" x2="106" y2="106" stroke={RED} strokeWidth="14" />
          <line x1="106" y1="14" x2="14" y2="106" stroke={RED} strokeWidth="14" />
          <line x1="20" y1="20" x2="100" y2="100" stroke={WHITE} strokeWidth="4" />
          <line x1="100" y1="20" x2="20" y2="100" stroke={WHITE} strokeWidth="4" />
        </svg>
      );
    case "calzada-estrecha":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <rect x="60" y="6" width="76" height="76" transform="rotate(45 60 60)" fill={YELLOW} stroke={BLACK} strokeWidth="5" />
          <path d="M40 92 L52 60 L40 28" stroke={BLACK} strokeWidth="7" fill="none" />
          <path d="M80 92 L68 60 L80 28" stroke={BLACK} strokeWidth="7" fill="none" />
        </svg>
      );
    case "zona-escolar":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <rect x="60" y="6" width="76" height="76" transform="rotate(45 60 60)" fill={YELLOW} stroke={BLACK} strokeWidth="5" />
          <circle cx="50" cy="44" r="7" fill={BLACK} />
          <path d="M50 52 L50 76 M50 60 L38 68 M50 60 L62 68 M50 76 L42 92 M50 76 L58 92" stroke={BLACK} strokeWidth="5" fill="none" />
          <circle cx="76" cy="50" r="6" fill={BLACK} />
          <path d="M76 57 L76 78 M76 78 L70 92 M76 78 L82 92" stroke={BLACK} strokeWidth="5" fill="none" />
        </svg>
      );
    case "no-bicicletas":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <circle cx="40" cy="74" r="14" fill="none" stroke={BLACK} strokeWidth="6" />
          <circle cx="82" cy="74" r="14" fill="none" stroke={BLACK} strokeWidth="6" />
          <path d="M40 74 L58 74 L70 50 L82 74" stroke={BLACK} strokeWidth="6" fill="none" />
          <line x1="24" y1="96" x2="96" y2="24" stroke={RED} strokeWidth="10" />
        </svg>
      );
    case "direccion-obligatoria":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={BLUE} stroke={WHITE} strokeWidth="6" />
          <path d="M60 92 L60 42" stroke={WHITE} strokeWidth="10" />
          <polygon points="60,22 40,48 80,48" fill={WHITE} />
        </svg>
      );
    case "no-adelantarse":
      return (
        <svg {...common} aria-label="Señal de tránsito">
          <circle cx="60" cy="60" r="52" fill={WHITE} stroke={RED} strokeWidth="10" />
          <rect x="28" y="46" width="26" height="40" rx="5" fill={BLACK} />
          <rect x="66" y="46" width="26" height="40" rx="5" fill={RED} />
        </svg>
      );
    default:
      return null;
  }
};

export default TrafficSign;
