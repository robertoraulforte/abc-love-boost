import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tag, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPublicSupabaseClient } from "@/lib/publicSupabaseClient";
import ZoneDialog from "./ZoneDialog";

interface Promo {
  id: string;
  titulo: string;
  descripcion: string | null;
  fecha: string;
}

const Promos = () => {
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
      .channel("home-promos")
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

  if (!loading && promos.length === 0) return null;

  const visible = promos.slice(0, 3);

  return (
    <section id="promos" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Promos vigentes
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Aprovechá nuestras ofertas
          </h2>
          <p className="mt-3 text-muted-foreground">
            Beneficios exclusivos pensados para que arranques a manejar hoy mismo.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <article
                  key={p.id}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
                >
                  <span className="inline-flex w-fit animate-pulse items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-elegant ring-2 ring-red-500/40">
                    <Tag className="h-3 w-3" />
                    ¡Oferta limitada!
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{p.titulo}</h3>
                  {p.descripcion && (
                    <p className="mt-2 text-sm text-muted-foreground">{p.descripcion}</p>
                  )}
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

            {promos.length > 3 && (
              <div className="mt-10 text-center">
                <Link to="/promos">
                  <Button
                    variant="outline"
                    className="font-bold uppercase tracking-wide hover:border-primary hover:text-primary"
                  >
                    Ver todas las promos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Promos;
