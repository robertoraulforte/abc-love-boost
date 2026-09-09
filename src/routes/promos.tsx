import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ZoneDialog from "@/components/ZoneDialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const Route = createFileRoute("/promos")({
  head: () => ({
    meta: [
      { title: "Promos vigentes — ABC Conducción" },
      {
        name: "description",
        content: "Todas las promos vigentes de ABC Conducción en Mar del Plata.",
      },
      { property: "og:title", content: "Promos vigentes — ABC Conducción" },
      {
        property: "og:description",
        content: "Aprovechá descuentos y beneficios exclusivos en cursos de manejo.",
      },
    ],
  }),
  component: PromosPublic,
});

interface Promo {
  id: string;
  title: string;
  description: string | null;
  created_at: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_tipo: string | null;
}

function PromosPublic() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .schema("public")
        .from("promos")
        .select("id, title, description, created_at, archivo_url, archivo_nombre, archivo_tipo")
        .order("created_at", { ascending: false });


      if (error) {
        console.error("Promos fetch error:", error);
      }

      setPromos((data ?? []) as Promo[]);
      setLoading(false);
    };
    load();
    const ch = supabase
      .channel("public-promos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "promos" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const [highlightId, setHighlightId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    return hash.startsWith("#promo-") ? hash.slice("#promo-".length) : null;
  });

  const filtered = highlightId ? promos.filter((p) => p.id === highlightId) : promos;

  useEffect(() => {
    if (loading || typeof window === "undefined" || !highlightId) return;
    const el = document.getElementById(`promo-${highlightId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [loading, highlightId, promos]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28">
        <section className="container mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>

          <div className="mt-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Promos vigentes
            </span>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">Todas nuestras promos</h1>
            <p className="mt-3 text-muted-foreground">
              Beneficios exclusivos pensados para que arranques a manejar hoy mismo.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : promos.length === 0 ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-muted px-6 py-14 text-center">
              <p className="text-2xl font-bold uppercase tracking-wide text-foreground">
                Pronto llegan nuevas promociones...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-muted px-6 py-14 text-center">
              <p className="text-lg font-bold">No se encontró esa promoción.</p>
              <button
                onClick={() => setHighlightId(null)}
                className="mt-3 text-sm font-semibold text-primary hover:underline"
              >
                Ver todas las promos
              </button>
            </div>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  id={`promo-${p.id}`}
                  className={`scroll-mt-32 flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant ${
                    highlightId === p.id
                      ? "border-primary ring-2 ring-primary shadow-elegant"
                      : "border-border"
                  }`}
                >
                  {p.archivo_url && p.archivo_tipo?.startsWith("image/") && (
                    <a
                      href={p.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 block overflow-hidden rounded-xl border border-border bg-muted/30"
                    >
                      <img
                        src={p.archivo_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-auto w-full object-contain"
                      />
                    </a>
                  )}
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    <Tag className="h-3 w-3" /> Promo
                  </span>
                  <h2 className="mt-4 text-xl font-bold break-words">{p.title}</h2>
                  {p.description && (
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  )}
                  {p.created_at && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <div className="mt-auto pt-5">
                    <ZoneDialog
                      trigger={
                        <Button className="w-full bg-primary font-bold uppercase text-primary-foreground hover:bg-primary/90">
                          Consultar
                        </Button>
                      }
                      message={`Hola! Quiero consultar por la promo "${p.title}".`}
                    />
                  </div>
                </article>
              ))}

            </div>
          )}
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
