import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { WhySection } from "../components/landing/WhySection";
import { FAQSection } from "../components/landing/FAQSection";
import { CTASection } from "../components/landing/CTASection";
import { Footer } from "../components/landing/Footer";

export function Landing() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full overflow-hidden">
          <Hero />
          <HowItWorks />
          <WhySection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
      <Footer />
    </>
  );
}
