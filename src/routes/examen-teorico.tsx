import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Share2,
  Trophy,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import TrafficSign from "@/components/TrafficSign";
import {
  PORCENTAJE_APROBACION,
  TOTAL_PREGUNTAS,
  pickRandomQuestions,
  type Question,
} from "@/data/examenTeorico";

export const Route = createFileRoute("/examen-teorico")({
  head: () => ({
    meta: [
      { title: "Simulador Examen Teórico de Conducir | ABC Conducción" },
      {
        name: "description",
        content:
          "Practicá gratis el examen teórico de conducir de Mar del Plata: 15 preguntas al azar, señales de tránsito y resultados al instante.",
      },
      { property: "og:title", content: "Simulador Examen Teórico de Conducir | ABC Conducción" },
      {
        property: "og:description",
        content:
          "15 preguntas al azar sobre normas y señales de tránsito. Practicá online y llegá listo a rendir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamenTeorico,
});

const LETTERS = ["A", "B", "C"] as const;

function ExamenTeorico() {
  const [questions, setQuestions] = useState<Question[]>(() => pickRandomQuestions());
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(TOTAL_PREGUNTAS).fill(null),
  );
  const [finished, setFinished] = useState(false);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

  const total = questions.length;
  const question = questions[current];
  const selected = answers[current];
  const progress = ((current + (finished ? 1 : 0)) / total) * 100;

  const correctCount = answers.reduce<number>(
    (acc, a, i) => (a !== null && a === questions[i]?.correct ? acc + 1 : acc),
    0,
  );
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= PORCENTAJE_APROBACION;

  const restart = () => {
    setQuestions(pickRandomQuestions());
    setAnswers(Array(TOTAL_PREGUNTAS).fill(null));
    setCurrent(0);
    setFinished(false);
    setOpenDetail(null);
  };

  const select = (idx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/examen-teorico` : "";
    const text = `Saqué ${score}% en el simulador del examen teórico de ABC Conducción. ¡Probalo vos!`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Simulador Examen Teórico", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("¡Resultado copiado! Ya podés pegarlo donde quieras.");
    } catch {
      /* usuario canceló */
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-28 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-smooth hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>

          <div className="mt-4 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Simulador
            </span>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">Examen Teórico de Conducir</h1>
            <p className="mt-3 text-muted-foreground">
              {TOTAL_PREGUNTAS} preguntas al azar. Se aprueba con el {PORCENTAJE_APROBACION}% de
              respuestas correctas.
            </p>
          </div>

          {!finished ? (
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-primary">
                <span>
                  Pregunta {current + 1} de {total}
                </span>
                <span className="text-muted-foreground">
                  {answers.filter((a) => a !== null).length} respondidas
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="gradient-primary h-full rounded-full transition-smooth"
                  style={{ width: `${Math.max(progress, 4)}%` }}
                />
              </div>

              {question.sign && (
                <div className="mt-8 flex justify-center rounded-2xl border border-border bg-background/50 py-6">
                  <TrafficSign sign={question.sign} />
                </div>
              )}

              <h2 className="mt-8 text-xl font-black leading-snug md:text-2xl">{question.text}</h2>

              <div className="mt-6 grid gap-3">
                {question.options.map((opt, i) => {
                  const active = selected === i;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => select(i)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-smooth ${
                        active
                          ? "border-primary bg-primary/10 red-glow"
                          : "border-border bg-background/40 hover:border-primary"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="pt-1 text-sm font-semibold md:text-base">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={current === 0}
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  className="font-bold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                {current === total - 1 ? (
                  <Button
                    size="lg"
                    disabled={selected === null}
                    onClick={() => setFinished(true)}
                    className="gradient-primary animate-pulse-glow font-black uppercase tracking-wide text-primary-foreground"
                  >
                    <Trophy className="mr-2 h-5 w-5" /> Ver resultados
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled={selected === null}
                    onClick={() => setCurrent((c) => c + 1)}
                    className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
                  >
                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-6">
              <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
                <div
                  className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black ${
                    passed
                      ? "bg-primary text-primary-foreground red-glow"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {score}%
                </div>
                <h2 className="mt-5 text-2xl font-black md:text-3xl">
                  {passed ? "¡Felicitaciones! Estás listo para rendir" : "¡Seguí practicando!"}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {correctCount} de {total} respuestas correctas.{" "}
                  {passed
                    ? "Repasá las señales y sacá tu turno con confianza."
                    : "Te recomendamos repasar el material de estudio y volver a intentarlo."}
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    onClick={restart}
                    className="gradient-primary font-black uppercase tracking-wide text-primary-foreground"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" /> Volver a intentar
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={share}
                    className="border-primary/40 font-bold hover:border-primary hover:red-glow"
                  >
                    <Share2 className="mr-2 h-5 w-5" /> Compartir en redes
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
                <h3 className="text-lg font-black md:text-xl">Resumen de tus respuestas</h3>
                <div className="mt-4 grid gap-3">
                  {questions.map((q, i) => {
                    const given = answers[i];
                    const ok = given === q.correct;
                    const isOpen = openDetail === i;
                    return (
                      <div key={q.id} className="rounded-xl border border-border bg-background/40">
                        <button
                          type="button"
                          onClick={() => setOpenDetail(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-start gap-3 p-4 text-left"
                        >
                          {ok ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                          )}
                          <span className="flex-1 text-sm font-semibold">
                            {i + 1}. {q.text}
                          </span>
                          <ChevronDown
                            className={`mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-border px-4 pb-4 pt-3">
                            {q.sign && (
                              <div className="mb-3 flex justify-center">
                                <TrafficSign sign={q.sign} className="h-24 w-24" />
                              </div>
                            )}
                            <p className="text-sm">
                              <span className="font-black uppercase tracking-wider text-muted-foreground">
                                Tu respuesta:{" "}
                              </span>
                              {given !== null ? `${LETTERS[given]}) ${q.options[given]}` : "Sin responder"}
                            </p>
                            {!ok && (
                              <p className="mt-2 rounded-lg border border-primary/40 bg-primary/10 p-3 text-sm font-semibold">
                                Correcta: {LETTERS[q.correct]}) {q.options[q.correct]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
