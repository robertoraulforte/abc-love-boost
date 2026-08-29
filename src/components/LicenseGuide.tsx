import { useState } from "react";
import {
  FileCheck,
  CalendarCheck,
  Car,
  Download,
  ExternalLink,
  ChevronDown,
  BookOpen,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MATERIAL_ESTUDIO =
  "https://www.mardelplata.gob.ar/documentos/transporte_y_transito/manualdetransito-baja.pdf";
const MUNICIPALIDAD_TURNOS = "https://autenticar.mardelplata.gob.ar/";

type Step = {
  icon: typeof FileCheck;
  title: string;
  summary: string;
  items: { label: string; detail?: string }[];
  note?: string;
};

const steps: Step[] = [
  {
    icon: CalendarCheck,
    title: "Paso 1: Obtener turnos iniciales",
    summary: "Trámite original y charlas obligatorias.",
    items: [
      {
        label: "Trámite Original",
        detail: "Examen médico + foto en la sede municipal.",
      },
      {
        label: "Charlas obligatorias",
        detail:
          "Teórico principiante de Seguridad Vial y Teórico principiante de Legislación.",
      },
    ],
  },
  {
    icon: FileCheck,
    title: "Paso 2: Examen Teórico",
    summary: "Solicitá turno una vez completados los pasos previos.",
    items: [
      {
        label: "Solicitud de turno",
        detail:
          "Una vez realizados los pasos anteriores, pedí turno para rendir el examen teórico.",
      },
      {
        label: "Material de estudio",
        detail:
          "Repasá el manual oficial antes de rendir (descarga disponible más abajo).",
      },
    ],
  },
  {
    icon: Car,
    title: "Paso 3: Examen Práctico",
    summary: "Última instancia: ¡a manejar!",
    items: [
      {
        label: "Solicitud de turno",
        detail:
          "Una vez aprobado el teórico, estarás en condiciones de solicitar turno para el examen práctico.",
      },
    ],
    note: "Coordinar previamente con la academia qué turno sacar",
  },
];

const tutorialSteps = [
  "Ingresá a https://autenticar.mardelplata.gob.ar/ y seleccioná la opción 'Ciudadano'.",
  "Iniciá sesión con tu cuenta de ARCA (ex AFIP) o Mi Argentina.",
  "Una vez dentro del sistema MDQ Digital, buscá la opción 'Turnos' o 'Licencia de Conducir'.",
  "Completá tus datos personales y verificá que estén actualizados.",
  "Seleccioná la sede municipal donde querés atenderte.",
  "Elegí la fecha y horario disponible que mejor se adapta a tu agenda.",
  "Confirmá el turno y descargá o guardá el comprobante.",
  "Acudí a la sede el día y horario indicados con la documentación requerida.",
];

const LicenseGuide = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <section id="licencia" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Trámite
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Tramitá tu Licencia
          </h2>
          <p className="mt-3 text-muted-foreground">
            Una guía clara para que sepas exactamente qué hacer en cada paso.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5">
          {steps.map(({ icon: Icon, title, summary, items, note }, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card shadow-card transition-smooth hover:border-primary"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 p-6 text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black md:text-xl">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {summary}
                    </p>
                  </div>
                  <ChevronDown
                    className={`mt-2 h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-border px-6 pb-6 pt-4">
                    <ol className="space-y-3">
                      {items.map((item, i) => (
                        <li
                          key={item.label}
                          className="rounded-lg border border-border bg-background/40 p-3"
                        >
                          <p className="text-[11px] font-black uppercase tracking-wider text-primary">
                            {i + 1}. {item.label}
                          </p>
                          {item.detail && (
                            <p className="mt-1 text-sm text-foreground/80">
                              {item.detail}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                    {note && (
                      <p className="mt-4 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm font-semibold text-foreground">
                        {note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={MUNICIPALIDAD_TURNOS}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="gradient-primary animate-pulse-glow w-full font-black uppercase tracking-wide text-primary-foreground hover:opacity-95"
            >
              Obtener Turnos (Web Municipalidad)
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a
            href={MATERIAL_ESTUDIO}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary/40 font-bold hover:border-primary hover:red-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar Material de Estudio (PDF)
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LicenseGuide;
