import Link from "next/link";
import { ArrowUpRight, Crosshair } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="eyebrow">
        <span className="section-number">404</span> SINAL PERDIDO
      </div>
      <h1>Esse caminho saiu do radar.</h1>
      <p>
        A página não existe ou o jogo não está no nosso catálogo demonstrativo.
        Continue explorando: tem sinal novo em todas as seções.
      </p>
      <div className="hero-actions">
        <Link className="button primary" href="/">
          <Crosshair size={17} aria-hidden="true" /> Voltar para a home
        </Link>
        <Link className="button ghost" href="/deals">
          Explorar catálogo <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <nav className="not-found-nav" aria-label="Navegação da página 404">
        <Link href="/signals">Signals</Link>
        <Link href="/discover">Discover</Link>
        <Link href="/radar">Meu radar</Link>
      </nav>
    </div>
  );
}