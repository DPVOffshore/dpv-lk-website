import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortsTicker from "@/components/PortsTicker";
import MainSiteSection from "@/components/MainSiteSection";
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
        <MainSiteSection />
        <AboutStats />
        <WhyChooseUs />
        <ClientLogos />
        <ServicesSection />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
