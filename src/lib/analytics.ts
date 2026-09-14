/** Google Analytics 4 helpers. */
export const GA_MEASUREMENT_ID =
  (import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined) || "G-9B5SVRGKNT";

type GtagParams = Record<string, unknown>;

function getWindow(): any | undefined {
  return typeof window !== "undefined" ? (window as any) : undefined;
}

/** Envía un evento personalizado a GA4 (y al dataLayer para GTM). */
export function trackEvent(name: string, params: GtagParams = {}) {
  const w = getWindow();
  if (!w) return;

  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  } else {
    w.dataLayer.push({ event: name, ...params });
  }
  console.log(`[GA4] ${name}`, params);
}

/** Clic saliente a WhatsApp, con la ubicación de origen. */
export function trackWhatsApp(ubicacion: string) {
  trackEvent("click_whatsapp", { ubicacion });
}