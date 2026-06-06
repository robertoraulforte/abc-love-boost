export const WHATSAPP_MESSAGE =
  "Hola! me comunico desde la web. Quiero consultar por los servicios e inscripción.";

export const ZONES = [
  {
    id: "z1",
    label: "Zona 1",
    phone: "5492235850181",
    display: "223-585-0181",
    barrios:
      "Centro, Güemes, Alem, Chauvín, Los Troncos, Gaucho y aledaños",
    message:
      "¡Hola! Me comunico desde la web de ABC Conducción. Vivo en la Zona 1 y quiero consultar por los cursos.",
  },
  {
    id: "z2",
    label: "Zona 2",
    phone: "5492236191907",
    display: "223-619-1907",
    barrios:
      "La Perla, Parque Luro, Constitución, Faro, Bosque, Mogotes y aledaños",
    message:
      "¡Hola! Me comunico desde la web de ABC Conducción. Vivo en la Zona 2 y quiero consultar por los cursos.",
  },
] as const;

export function waUrl(phone: string, message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const ZONE_CONVERSION_SEND_TO: Record<string, string> = {
  z1: "AW-843038448/R0tqcCO2Y-rccEPD9_pED",
  z2: "AW-843038448/5NbgCOiz-rccEPD9_pED",
};

export function trackZoneConversion(zoneId: string) {
  const sendTo = ZONE_CONVERSION_SEND_TO[zoneId];
  if (!sendTo) return;
  const w = typeof window !== "undefined" ? (window as Window & { gtag?: (...args: unknown[]) => void }) : undefined;
  if (w?.gtag) {
    w.gtag("event", "conversion", { send_to: sendTo });
  }
}
