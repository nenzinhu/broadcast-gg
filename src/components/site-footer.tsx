import { AudioLines, ArrowUpRight } from "lucide-react";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="brand" href="#inicio">
          <AudioLines aria-hidden="true" />
          <span>
            BROADCAST<span className="lime">.GG</span>
          </span>
        </a>
        <p>Menos ruído. Mais jogo.</p>
        <a href="#inicio">
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
        exemplos, sem atualização em tempo real. Artes conceituais originais;
        não são imagens oficiais dos jogos.
      </p>
    </footer>
  );
}
