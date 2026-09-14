import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Promos from "@/components/Promos";
import Coverage from "@/components/Coverage";
import Contact from "@/components/Contact";
import Rental from "@/components/Rental";
import RentalTrailer from "@/components/RentalTrailer";
import Footer from "@/components/Footer";
import BookingSteps from "@/components/BookingSteps";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import QuickServices from "@/components/QuickServices";
import LicenseGuide from "@/components/LicenseGuide";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ABC Conducción — Escuela de manejo en Mar del Plata" },
    { name: "description", content: "Aprendé a manejar en Mar del Plata con ABC Conducción. Cursos, alquiler para examen y simulador teórico online." },
    { property: "og:title", content: "ABC Conducción — Escuela de manejo en Mar del Plata" },
    { property: "og:description", content: "Cursos de manejo, alquiler para examen y práctica teórica en Mar del Plata." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Courses />
        <QuickServices />
        <Rental />
        <RentalTrailer />
        <Promos />
        <BookingSteps />
        <Coverage />
        <LicenseGuide />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
