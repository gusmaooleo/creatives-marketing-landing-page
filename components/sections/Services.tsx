import { floatingIcons } from "../ui/floating-icons";
import { FloatingIconsHero } from "../ui/floating-icons-hero-section";

export default function Services() {
  return (
    <section id="services" className="">
      <FloatingIconsHero icons={floatingIcons} />
    </section>
  );
}
