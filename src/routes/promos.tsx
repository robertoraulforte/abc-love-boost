import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPublicSupabaseClient } from "@/lib/publicSupabaseClient";
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
  titulo: string;
  descripcion: string | null;
  fecha: string;
}

function PromosPublic() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicSupabase = createPublicSupabaseClient();

    const load = async () => {
      const { data, error } = await publicSupabase
        .from("promociones")
        .select("id, titulo, descripcion, fecha")
        .eq("vigente", true)
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Promociones fetch error:", error);
      }

      setPromos(data ?? []);
      setLoading(false);
    };
    load();
    const ch = publicSupabase
      .channel("public-promos")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "promociones" },
        () => load(),
      )
      .subscribe();
    return () => {
      publicSupabase.removeChannel(ch);
    };
  }, []);

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
            <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              No hay promos vigentes en este momento. Volvé pronto.
            </div>
          ) : (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {promos.map((p) => (
                <article
                  key={p.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
                >
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">
                    <Tag className="h-3 w-3" /> Promo
                  </span>
                  <h2 className="mt-4 text-xl font-bold">{p.titulo}</h2>
                  {p.descripcion && (
                    <p className="mt-2 text-sm text-muted-foreground">{p.descripcion}</p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    {new Date(p.fecha).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-auto pt-5">
                    <ZoneDialog
                      trigger={
                        <Button className="w-full bg-primary font-bold uppercase text-primary-foreground hover:bg-primary/90">
                          Consultar
                        </Button>
                      }
                      message={`Hola! Quiero consultar por la promo "${p.titulo}".`}
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
