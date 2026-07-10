import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortsTicker from "@/components/PortsTicker";
import ServicesSection from "@/components/ServicesSection";
import AboutStats from "@/components/AboutStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import ClientLogos from "@/components/ClientLogos";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortsTicker />
        <ServicesSection />
        <AboutStats />
        <WhyChooseUs />
        <ClientLogos />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
