import { FileCheck, CalendarCheck, GraduationCap, Car, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const MATERIAL_ESTUDIO =
  "https://www.mardelplata.gob.ar/documentos/transporte_y_transito/manualdetransito-baja.pdf";
const MUNICIPALIDAD_TURNOS_ONLINE =
  "https://appsb.mardelplata.gob.ar/Consultas/nTurnosWeb/Vistas/FrontEnd/TurnosFiltros.aspx?Cod_Sistema=1";

const steps = [
  {
    icon: GraduationCap,
    title: "1. Curso de Seguridad Vial",
    description:
      "Completá el curso obligatorio de Seguridad Vial, en modalidad online o presencial.",
  },
  {
    icon: CalendarCheck,
    title: "2. Turno Municipal",
    description:
      "Solicitá el turno para el examen en la web oficial de la Municipalidad de Mar del Plata.",
  },
  {
    icon: FileCheck,
    title: "3. Examen Teórico",
    description:
      "Estudiá el material oficial y rendí el examen teórico en la sede asignada.",
  },
  {
    icon: Car,
    title: "4. Examen Práctico",
    description:
      "Rendí el práctico con nuestros vehículos (incluido en el curso de 16 clases).",
  },
];

const LicenseGuide = () => {
  return (
    <section id="licencia" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Trámite
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Tramitá tu Licencia</h2>
          <p className="mt-3 text-muted-foreground">
            Una guía clara para que sepas exactamente qué hacer en cada paso.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:red-glow hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={MATERIAL_ESTUDIO} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="gradient-primary animate-pulse-glow w-full font-black uppercase tracking-wide text-primary-foreground hover:opacity-95"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar Material de Estudio
            </Button>
          </a>
          <a href={MUNICIPALIDAD_TURNOS_ONLINE} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-primary/40 font-bold hover:border-primary hover:red-glow"
            >
              Obtener Turnos
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LicenseGuide;
