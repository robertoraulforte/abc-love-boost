/** Google Analytics 4 helpers. */
export const GA_MEASUREMENT_ID =
  (import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined) ||
  (import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as string | undefined) ||
  "G-9B5SVRGKNT";

type GtagParams = Record<string, unknown>;

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Envía un evento personalizado a GA4 (y al dataLayer para GTM). */
export function trackEvent(name: string, params: GtagParams = {}) {
  const w = typeof window !== "undefined" ? window as AnalyticsWindow : undefined;
  if (!w) return;

  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag === "function") {
    w.gtag("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
  } else {
    w.gtag = function () { w.dataLayer?.push(arguments); };
    w.gtag("event", name, { ...params, send_to: GA_MEASUREMENT_ID });
  }
}

/** Clic saliente a WhatsApp, con la ubicación de origen. */
export function trackWhatsApp(ubicacion: string) {
  trackEvent("click_whatsapp", { ubicacion });
}