import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import UploadZone from '@/components/UploadZone';
import ToolGrid from '@/components/ToolGrid';
import HowItWorks from '@/components/HowItWorks';
import FeaturesSection from '@/components/FeaturesSection';
import AIFeatures from '@/components/AIFeatures';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <UploadZone />
      <div className="section-divider mx-8" />
      <ToolGrid />
      <HowItWorks />
      <FeaturesSection />
      <AIFeatures />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
