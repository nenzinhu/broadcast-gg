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
        <nav className="footer-nav" aria-label="Navegação do rodapé">
          <Link href="/signals">Signals</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/radar">Meu radar</Link>
        </nav>
        <p>Menos ruído. Mais jogo.</p>
        <a href="#top">
          Voltar ao topo <ArrowUpRight size={15} aria-hidden="true" />
        </a>
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
        exemplos, sem atualização em tempo real. As artes são promocionais dos
        respectivos jogos, usadas apenas nesta demonstração.
      </p>
    </footer>
  );
}