import { MessageCircle } from "lucide-react";
import ZoneDialog from "./ZoneDialog";

const FloatingWhatsApp = () => {
  return (
    <div className="fixed bottom-5 right-5 z-30 md:bottom-7 md:right-7">
      <ZoneDialog
        trigger={
          <button
            aria-label="Consultar por WhatsApp"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.17_145)] text-white shadow-elegant transition-smooth hover:scale-110 hover:bg-[oklch(0.65_0.17_145)]"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="absolute -inset-1 -z-10 animate-ping rounded-full bg-[oklch(0.7_0.17_145)] opacity-30" />
          </button>
        }
      />
    </div>
  );
};

export default FloatingWhatsApp;
