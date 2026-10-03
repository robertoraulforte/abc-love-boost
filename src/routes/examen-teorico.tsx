import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Info,
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
import { trackEvent } from "@/lib/analytics";
import LeadGateDialog, { LEAD_STORAGE_KEY } from "@/components/LeadGateDialog";
import {
  PORCENTAJE_APROBACION,
  TOTAL_PREGUNTAS,
  TOTAL_PREGUNTAS_SENALES,
  pickRandomQuestions,
  type ExamMode,
  type Question,
} from "@/data/examenTeorico";

export const Route = createFileRoute("/examen-teorico")({
  head: () => ({
    meta: [
      { title: "Simulador Examen Teórico de Conducir | ABC Conducción" },
      {
        name: "description",
        content:
          "Practicá gratis el examen teórico de conducir de Mar del Plata: preguntas al azar, señales de tránsito y resultados al instante.",
      },
      { property: "og:title", content: "Simulador Examen Teórico de Conducir | ABC Conducción" },
      {
        property: "og:description",
        content:
          "Preguntas al azar sobre normas y señales de tránsito. Practicá online y llegá listo a rendir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamenTeorico,
});

const LETTERS = ["A", "B", "C"] as const;

function SignBox({ sign, size = "lg" }: { sign: Question["sign"]; size?: "lg" | "sm" }) {
  if (!sign) return null;
  return (
    <div
      className={`mx-auto flex aspect-square w-full items-center justify-center rounded-xl border border-border bg-neutral-900/50 p-3 ${
        size === "lg" ? "max-w-[200px] md:max-w-[240px]" : "max-w-[160px]"
      }`}
    >
      <TrafficSign sign={sign} />
    </div>
  );
}

function ExamenTeorico() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<ExamMode>("completo");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

  const total = questions.length;
  const question = questions[current];
  const selected = answers[current] ?? null;
  const answered = selected !== null;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = total ? (answeredCount / total) * 100 : 0;

  const correctCount = answers.reduce<number>(
    (acc, a, i) => (a !== null && a === questions[i]?.correct ? acc + 1 : acc),
    0,
  );
  const score = total ? Math.round((correctCount / total) * 100) : 0;
  const passed = score >= PORCENTAJE_APROBACION;

  const [gateOpen, setGateOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<ExamMode>("completo");

  const start = (selectedMode: ExamMode) => {
    let ok = false;
    try {
      ok = localStorage.getItem(LEAD_STORAGE_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (!ok) {
      setPendingMode(selectedMode);
      setGateOpen(true);
      return;
    }
    beginExam(selectedMode);
  };

  const beginExam = (selectedMode: ExamMode) => {
    const count = selectedMode === "senales" ? TOTAL_PREGUNTAS_SENALES : TOTAL_PREGUNTAS;
    const qs = pickRandomQuestions(count, selectedMode);
    setMode(selectedMode);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
    setCurrent(0);
    setFinished(false);
    setOpenDetail(null);
    setStarted(true);
    trackEvent("start_examen_practica", { modo: selectedMode, total_preguntas: qs.length });
  };

  const restart = () => start(mode);

  const backToModes = () => {
    setStarted(false);
    setFinished(false);
  };

  const select = (idx: number) => {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const goNext = () => {
    if (!answered || finished) return;
    if (current === total - 1) {
      trackEvent("complete_examen_practica", {
        score,
        correctas: correctCount,
        total_preguntas: total,
        modo: mode,
        aprobado: passed,
      });
      setFinished(true);
    }
    else setCurrent((c) => c + 1);
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
              Preguntas al azar sobre normas y señales de tránsito. Se aprueba con el{" "}
              {PORCENTAJE_APROBACION}% de respuestas correctas.
            </p>
          </div>

          {!started ? (
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
              <h2 className="text-xl font-black md:text-2xl">Elegí cómo querés practicar</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Podés rendir el examen completo (incluye preguntas de señales) o practicar solamente
                las señales de tránsito.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => start("completo")}
                  className="rounded-2xl border border-border bg-background/40 p-5 text-left transition-smooth hover:border-primary hover:red-glow"
                >
                  <span className="text-xs font-black uppercase tracking-wider text-primary">
                    Recomendado
                  </span>
                  <h3 className="mt-2 text-lg font-black">Examen completo</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {TOTAL_PREGUNTAS} preguntas al azar de normas, prioridades y señales viales.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => start("senales")}
                  className="rounded-2xl border border-border bg-background/40 p-5 text-left transition-smooth hover:border-primary hover:red-glow"
                >
                  <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Práctica focalizada
                  </span>
                  <h3 className="mt-2 text-lg font-black">Solo señales de tránsito</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {TOTAL_PREGUNTAS_SENALES} señales oficiales argentinas con corrección y
                    explicación al instante.
                  </p>
                </button>
              </div>
            </div>
          ) : !finished ? (
            <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-primary">
                <span>
                  Pregunta {current + 1} de {total}
                </span>
                <span className="text-muted-foreground">{correctCount} correctas</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="gradient-primary h-full rounded-full transition-smooth"
                  style={{ width: `${Math.max(progress, 4)}%` }}
                />
              </div>

              {question.sign && (
                <div className="mt-8">
                  <SignBox sign={question.sign} />
                </div>
              )}

              <h2 className="mt-8 text-xl font-black leading-snug md:text-2xl">{question.text}</h2>

              <div className="mt-6 grid gap-3">
                {question.options.map((opt, i) => {
                  const isCorrect = i === question.correct;
                  const isSelected = selected === i;
                  let cls = "border-border bg-background/40 hover:border-primary";
                  let badge = "bg-muted text-muted-foreground";
                  if (answered) {
                    if (isCorrect) {
                      cls = "border-green-500 bg-green-500/10";
                      badge = "bg-green-500 text-white";
                    } else if (isSelected) {
                      cls = "border-destructive bg-destructive/10";
                      badge = "bg-destructive text-white";
                    } else {
                      cls = "border-border bg-background/40 opacity-60";
                    }
                  } else if (isSelected) {
                    cls = "border-primary bg-primary/10 red-glow";
                    badge = "bg-primary text-primary-foreground";
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={answered}
                      onClick={() => select(i)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-smooth ${cls}`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black ${badge}`}
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="pt-1 text-sm font-semibold md:text-base">{opt}</span>
                      {answered && isCorrect && (
                        <CheckCircle2 className="ml-auto mt-1 h-5 w-5 shrink-0 text-green-500" />
                      )}
                      {answered && isSelected && !isCorrect && (
                        <XCircle className="ml-auto mt-1 h-5 w-5 shrink-0 text-destructive" />
                      )}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`mt-4 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                    selected === question.correct
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-destructive/50 bg-destructive/10"
                  }`}
                >
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p>
                    <span className="font-black">
                      {selected === question.correct ? "¡Correcto! " : "Incorrecto. "}
                    </span>
                    {question.explanation ??
                      `La respuesta correcta es ${LETTERS[question.correct]}) ${
                        question.options[question.correct]
                      }.`}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button variant="outline" size="lg" onClick={backToModes} className="font-bold">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cambiar modo
                </Button>
                {current === total - 1 ? (
                  <Button
                    size="lg"
                    disabled={!answered}
                    onClick={goNext}
                    className="gradient-primary animate-pulse-glow font-black uppercase tracking-wide text-primary-foreground"
                  >
                    <Trophy className="mr-2 h-5 w-5" /> Ver resultados
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled={!answered}
                    onClick={goNext}
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
                  {passed ? "¡Aprobado! Estás listo para rendir" : "Desaprobado — ¡seguí practicando!"}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {correctCount} de {total} respuestas correctas.{" "}
                  {passed
                    ? "Repasá las señales y sacá tu turno con confianza."
                    : `Necesitás al menos el ${PORCENTAJE_APROBACION}% para aprobar. Repasá el resumen y volvé a intentarlo.`}
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
                  <Button size="lg" variant="ghost" onClick={backToModes} className="font-bold">
                    Cambiar modo
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
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
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
                              <div className="mb-3">
                                <SignBox sign={q.sign} size="sm" />
                              </div>
                            )}
                            <p className="text-sm">
                              <span className="font-black uppercase tracking-wider text-muted-foreground">
                                Tu respuesta:{" "}
                              </span>
                              {given !== null && given !== undefined
                                ? `${LETTERS[given]}) ${q.options[given]}`
                                : "Sin responder"}
                            </p>
                            {!ok && (
                              <p className="mt-2 rounded-lg border border-green-500/40 bg-green-500/10 p-3 text-sm font-semibold">
                                Correcta: {LETTERS[q.correct]}) {q.options[q.correct]}
                              </p>
                            )}
                            {q.explanation && (
                              <p className="mt-2 text-sm text-muted-foreground">{q.explanation}</p>
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
      <LeadGateDialog
        open={gateOpen}
        onOpenChange={setGateOpen}
        onSuccess={() => {
          setGateOpen(false);
          beginExam(pendingMode);
        }}
      />
    </div>
  );
}
