import Link from "next/link";
import { AudioLines, ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="brand" href="/">
          <AudioLines aria-hidden="true" />
          <span>
            BROADCAST<span className="lime">.GG</span>
          </span>
        </Link>
        <p>Menos ruído. Mais jogo.</p>
        <Link href="#top">
          Voltar ao topo <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BROADCAST.GG</span>
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
