import { ArrowUpRight, AudioLines, ScanLine } from "lucide-react";
export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="BROADCAST.GG início">
        <AudioLines aria-hidden="true" />
        <span>
          BROADCAST<span className="lime">.GG</span>
        </span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#signals">Signals</a>
        <a href="#deals">Deals</a>
        <a href="#discover">Discover</a>
      </nav>
      <a className="header-radar" href="#radar">
        <ScanLine size={16} aria-hidden="true" />
        <span>Meu radar</span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </header>
  );
}
