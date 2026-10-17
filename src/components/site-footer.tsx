import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="brand" href="/">
          <Image
            src="/logo.png"
            alt="broadcastganes.com.br"
            className="brand-logo"
            width={1254}
            height={1254}
            priority
          />
        </Link>
        <p>Menos ruído. Mais jogo.</p>
        <Link href="#top">
          Voltar ao topo <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} broadcastganes.com.br</span>
        <span>O que mudou. O que importa. O que jogar.</span>
        <span>
          FEITO PARA QUEM JOGA <span className="lime">↗</span>
        </span>
      </div>
      <p className="disclaimer">
        Protótipo demonstrativo. Preços, horários, sinais e recomendações são
        exemplos, sem atualização em tempo real. Capas e gameplay via Steam;
        vídeos via YouTube. Mídia dos respectivos estúdios. Artes alternativas
        são identificadas quando usadas.
      </p>
    </footer>
  );
}
