import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ZoneDialog from "./ZoneDialog";
import logo from "@/assets/abc-logo.png";

const links = [
  { href: "#cursos", label: "Cursos" },
  { href: "#promos", label: "Promos" },
  { href: "#como-contratar", label: "Cómo contratar" },
  { href: "#cobertura", label: "Zonas" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-smooth ${
        scrolled
          ? "bg-background/90 backdrop-blur border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ABC Conducción" className="h-10 w-auto md:h-12" width={120} height={48} />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-foreground/80 transition-smooth hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ZoneDialog
            trigger={
              <Button className="bg-primary font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90">
                Inscribite
              </Button>
            }
          />
        </div>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <ZoneDialog
              trigger={
                <Button className="mt-2 w-full bg-primary font-bold uppercase text-primary-foreground hover:bg-primary/90">
                  Inscribite
                </Button>
              }
            />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
