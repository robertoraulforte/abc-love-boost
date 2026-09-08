import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Info,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TrafficSign from "@/components/TrafficSign";
import { SIGN_PORCENTAJE_APROBACION, SIGN_QUESTIONS } from "@/data/examenSenales";

const LETTERS = ["A", "B", "C"] as const;

/** Imagen de señal con dimensiones fijas (sin layout shift) y fallback SVG local. */
function SignImage({
  url,
  fallbackSign,
  alt,
}: {
  url: string;
  fallbackSign?: import("@/data/examenTeorico").SignKey;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed && fallbackSign) {
    return <TrafficSign sign={fallbackSign} />;
  }

  return (
    <img
      src={url}
      alt={alt}
      width={400}
      height={400}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-contain"
    />
  );
}

function SignsQuiz() {
  const total = SIGN_QUESTIONS.length;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(total).fill(null));
  const [finished, setFinished] = useState(false);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

  const question = SIGN_QUESTIONS[current];
  const selected = answers[current];
  const answered = selected !== null;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = (answeredCount / total) * 100;

  const correctCount = answers.reduce<number>(
    (acc, a, i) => (a !== null && a === SIGN_QUESTIONS[i].correcta ? acc + 1 : acc),
    0,
  );
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= SIGN_PORCENTAJE_APROBACION;

  const select = (idx: number) => {
    if (answered) return; // feedback inmediato: no se puede cambiar una vez respondida
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const next = () => {
    if (current === total - 1) setFinished(true);
    else setCurrent((c) => c + 1);
  };

  const restart = () => {
    setAnswers(Array(total).fill(null));
    setCurrent(0);
    setFinished(false);
    setOpenDetail(null);
  };

  return (
    <div>
      {!finished ? (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-primary">
            <span>
              Pregunta {current + 1} de {total}
            </span>
            <span className="text-muted-foreground">
              {correctCount} correctas
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="gradient-primary h-full rounded-full transition-smooth"
              style={{ width: `${Math.max(progress, 4)}%` }}
            />
          </div>

          <div className="mx-auto mt-8 flex aspect-square w-full max-w-[220px] items-center justify-center rounded-xl border border-border bg-neutral-900/50 p-3 md:max-w-[260px]">
            <SignImage
              url={question.imagenUrl}
              fallbackSign={question.fallbackSign}
              alt="Señal de tránsito argentina"
            />
          </div>

          <h3 className="mt-8 text-xl font-black leading-snug md:text-2xl">{question.pregunta}</h3>

          <div className="mt-6 grid gap-3">
            {question.opciones.map((opt, i) => {
              const isCorrect = i === question.correcta;
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
                selected === question.correcta
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-destructive/50 bg-destructive/10"
              }`}
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p>
                <span className="font-black">
                  {selected === question.correcta ? "¡Correcto! " : "Incorrecto. "}
                </span>
                {question.explicacion}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            {current === total - 1 ? (
              <Button
                size="lg"
                disabled={!answered}
                onClick={next}
                className="gradient-primary animate-pulse-glow font-black uppercase tracking-wide text-primary-foreground"
              >
                <Trophy className="mr-2 h-5 w-5" /> Ver resultados
              </Button>
            ) : (
              <Button
                size="lg"
                disabled={!answered}
                onClick={next}
                className="bg-primary font-black uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
              >
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
            <div
              className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black ${
                passed ? "bg-primary text-primary-foreground red-glow" : "bg-muted text-foreground"
              }`}
            >
              {score}%
            </div>
            <h3 className="mt-5 text-2xl font-black md:text-3xl">
              {passed ? "¡Aprobado! Conocés las señales" : "Desaprobado — ¡seguí practicando!"}
            </h3>
            <p className="mt-3 text-muted-foreground">
              {correctCount} de {total} respuestas correctas.{" "}
              {passed
                ? "Excelente manejo de la señalización vial."
                : `Necesitás al menos el ${SIGN_PORCENTAJE_APROBACION}% para aprobar. Repasá el resumen y volvé a intentarlo.`}
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                size="lg"
                onClick={restart}
                className="gradient-primary font-black uppercase tracking-wide text-primary-foreground"
              >
                <RotateCcw className="mr-2 h-5 w-5" /> Reintentar test
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h4 className="text-lg font-black md:text-xl">Repaso de señales</h4>
            <div className="mt-4 grid gap-3">
              {SIGN_QUESTIONS.map((q, i) => {
                const given = answers[i];
                const ok = given === q.correcta;
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
                        {i + 1}. {q.pregunta}
                      </span>
                      <ChevronDown
                        className={`mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border px-4 pb-4 pt-3">
                        <div className="mx-auto mb-3 flex aspect-square w-full max-w-[180px] items-center justify-center rounded-xl border border-border bg-neutral-900/50 p-2">
                          <SignImage url={q.imagenUrl} fallbackSign={q.fallbackSign} alt="Señal" />
                        </div>
                        <p className="text-sm">
                          <span className="font-black uppercase tracking-wider text-muted-foreground">
                            Tu respuesta:{" "}
                          </span>
                          {given !== null ? `${LETTERS[given]}) ${q.opciones[given]}` : "Sin responder"}
                        </p>
                        {!ok && (
                          <p className="mt-2 rounded-lg border border-green-500/40 bg-green-500/10 p-3 text-sm font-semibold">
                            Correcta: {LETTERS[q.correcta]}) {q.opciones[q.correcta]}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-muted-foreground">{q.explicacion}</p>
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
  );
}

export default SignsQuiz;
