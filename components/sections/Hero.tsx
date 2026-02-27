import { CTASection } from "../ui/hero-dithering-card";
import HeroAnimation from "./hero/3DMarketing";

export default function Hero() {
  return (
    <section className="flex h-screen bg-background">
      <CTASection />
      <HeroAnimation />
    </section>
  );
}
