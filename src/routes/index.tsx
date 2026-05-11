import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Promos from "@/components/Promos";
import HowToHire from "@/components/HowToHire";
import Coverage from "@/components/Coverage";
import Contact from "@/components/Contact";
import Rental from "@/components/Rental";
import Footer from "@/components/Footer";
import BookingSteps from "@/components/BookingSteps";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Courses />
        <Promos />
        <HowToHire />
        <Coverage />
        <Rental />
        <Contact />
      </main>
      <BookingSteps />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
