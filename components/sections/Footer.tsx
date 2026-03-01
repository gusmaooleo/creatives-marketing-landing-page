import Link from "next/link";
import { Logo } from "../ui/logo";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { GradientBackground } from "../ui/noisy-gradient-backgrounds";

export default function Footer() {
  return (
    <div
      id="contato"
      className="relative h-[800px] md:h-[600px] w-full bg-transparent"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] md:h-[600px] w-full flex flex-col justify-end">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle gradient overlay to blend colors into the paper bg */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* <LivingFluidBackground /> */}
            <GradientBackground
              gradientOrigin="left-middle"
              colors={[
                { color: "rgba(50,0,0,1)", stop: "0%" },
                { color: "rgba(183,28,28,1)", stop: "30%" },
                { color: "rgba(244,67,54,1)", stop: "60%" },
                { color: "rgba(255,152,0,1)", stop: "85%" },
                { color: "rgba(255,235,59,1)", stop: "100%" },
              ]}
              noiseIntensity={1.5}
              noisePatternSize={70}
              noisePatternRefreshInterval={1}
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 pb-12 pt-16 md:pt-24 text-foreground flex flex-col justify-between h-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end flex-grow gap-12 mt-12 md:mt-24">
            <div className="max-w-xl">
              <Link
                href="/"
                className="flex items-center space-x-2 group mb-8 inline-block"
              >
                <Logo className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6">
                Pronto para <span className="italic text-primary">escalar</span>
                ?
              </h2>
              <p className="text-foreground/80 text-sm md:text-base max-w-md leading-relaxed">
                Transformamos marcas através de design excepcional,
                desenvolvimento limpo e marketing focado em conversão. O seu
                próximo nível começa aqui.
              </p>
            </div>

            <nav className="flex flex-wrap md:flex-nowrap gap-12 sm:gap-24 font-serif tracking-widest uppercase">
              <div className="flex flex-col space-y-5">
                <span className="text-primary font-bold text-xs mb-2">
                  Navegação
                </span>
                <Link
                  href="/#sobre-nos"
                  className="text-xs font-semibold hover:text-primary transition-colors hover:translate-x-1 duration-300"
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/#servicos"
                  className="text-xs font-semibold hover:text-primary transition-colors hover:translate-x-1 duration-300"
                >
                  Serviços
                </Link>
                <Link
                  href="#contato"
                  className="text-xs font-semibold hover:text-primary transition-colors hover:translate-x-1 duration-300"
                >
                  Contato
                </Link>
              </div>

              <div className="flex flex-col space-y-5">
                <span className="text-primary font-bold text-xs mb-2">
                  Social
                </span>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:text-primary transition-colors flex items-center gap-3 hover:translate-x-1 duration-300"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:text-primary transition-colors flex items-center gap-3 hover:translate-x-1 duration-300"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold hover:text-primary transition-colors flex items-center gap-3 hover:translate-x-1 duration-300"
                >
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              </div>
            </nav>
          </div>

          <div className="w-full h-[1px] bg-border/40 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-foreground/80 space-y-4 md:space-y-0 tracking-widest font-medium uppercase">
            <p>
              © {new Date().getFullYear()} Creatives Marketing. Direitos
              reservados.
            </p>
            <div className="flex gap-8">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
