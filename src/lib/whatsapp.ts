export const WHATSAPP_MESSAGE =
  "Hola! me comunico desde la web. Quiero consultar por los servicios e inscripción";

export const ZONES = [
  {
    id: "z1",
    label: "Zona 1 — Gascón 2508",
    phone: "5492235850181",
    display: "223-585-0181",
  },
  {
    id: "z2",
    label: "Zona 2 — 11 de Septiembre 3287",
    phone: "5492236191907",
    display: "223-619-1907",
  },
] as const;

export function waUrl(phone: string, message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
