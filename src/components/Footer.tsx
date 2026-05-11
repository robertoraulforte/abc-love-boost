import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import logo from "@/assets/abc-logo.png";

const LICENSE_URL = "https://www.mardelplata.gob.ar/movilidadurbana/licenciasdeconducir";
const STUDY_PDF_URL =
  "https://storage.mardelplata.gov.ar/index.php/s/R6oHEH4a9NrjP6i?dir=/&editing=false&openfile=true";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gasc%C3%B3n+2508+Mar+del+Plata";
const MAPS_URL_2 =
  "https://www.google.com/maps/search/?api=1&query=11+de+Septiembre+3287+Mar+del+Plata";

const socials = [
  { Icon: MessageCircle, href: "https://linktr.ee/ABConduccion", label: "WhatsApp" },
  { Icon: Instagram, href: "https://instagram.com/abc_conduccion", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com/AbcConduccion", label: "Facebook" },
  { Icon: LinkIcon, href: "https://linktr.ee/ABConduccion", label: "Linktree" },
];

const Footer = () => (
  <footer className="gradient-dark border-t border-white/10 text-white">
    <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="ABC Conducción"
            className="h-12 w-auto rounded bg-white/95 p-1"
            width={120}
            height={48}
            loading="lazy"
          />
          <span className="text-lg font-black">ABC Conducción</span>
        </div>
        <p className="mt-4 text-sm font-semibold text-primary-glow">
          "Formamos conductores, no solo alumnos."
        </p>
        <p className="mt-3 max-w-sm text-sm text-white/70">
          Escuela de Manejo · Mar del Plata · <span className="font-bold text-white">Desde 2009</span>. Aprendé a conducir con confianza, seguridad y un trato cercano.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Enlaces rápidos</h3>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li>
            <Link to="/" className="hover:text-primary-glow">
              Inicio
            </Link>
          </li>
          <li>
            <a href="/#cursos" className="hover:text-primary-glow">
              Cursos
            </a>
          </li>
          <li>
            <a href="/#como-contratar" className="hover:text-primary-glow">
              Cómo contratar
            </a>
          </li>
          <li>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary-glow"
            >
              Sucursal Gascón 2508 <ExternalLink className="h-3 w-3" />
            </a>
          </li>
          <li>
            <a
              href={MAPS_URL_2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary-glow"
            >
              Sucursal 11 de Septiembre 3287 <ExternalLink className="h-3 w-3" />
            </a>
          </li>
          <li>
            <a
              href={LICENSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary-glow"
            >
              Licencia de conducir <ExternalLink className="h-3 w-3" />
            </a>
          </li>
          <li>
            <a
              href={STUDY_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary-glow"
            >
              Material de estudio <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Seguinos</h3>
        <div className="mt-4 flex gap-2">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-smooth hover:border-primary hover:bg-primary"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="mt-6 space-y-1 text-sm text-white/80">
          <p>
            <span className="font-bold text-white">Zona 1:</span> 223-585-0181
          </p>
          <p>
            <span className="font-bold text-white">Zona 2:</span> 223-619-1907
          </p>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 md:flex-row">
        <p>
          © {new Date().getFullYear()} ABC Conducción · Mar del Plata · Todos los derechos
          reservados.
        </p>
        <Link to="/login" className="hover:text-white/90">
          Acceso panel
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
