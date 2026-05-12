import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tag, Sparkles, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import ZoneDialog from "./ZoneDialog";

interface Promo {
  id: string;
  title: string;
  description: string | null;
  created_at: string | null;
  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_tipo: string | null;
}

const Promos = () => {
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
      .channel("home-promos")
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
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <Skeleton className="h-5 w-24" />
                <Skeleton className="mt-4 h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-5/6" />
                <Skeleton className="mt-6 h-10 w-full" />
              </div>
            ))}
          </div>
        ) : promos.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card/60 px-6 py-14 text-center backdrop-blur red-glow">
            <p className="text-2xl font-bold uppercase tracking-wide text-foreground">
              Pronto llegan nuevas promociones...
            </p>
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
                  <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  )}
                  {p.archivo_url && (
                    p.archivo_tipo?.startsWith("image/") ? (
                      <a
                        href={p.archivo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 block overflow-hidden rounded-xl border border-border"
                      >
                        <img
                          src={p.archivo_url}
                          alt={p.title}
                          loading="lazy"
                          className="h-40 w-full object-cover transition-smooth hover:scale-[1.02]"
                        />
                      </a>
                    ) : (
                      <a
                        href={p.archivo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs font-semibold text-primary hover:bg-muted"
                      >
                        <FileText className="h-4 w-4" />
                        {p.archivo_nombre ?? "Ver archivo adjunto"}
                      </a>
                    )
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
