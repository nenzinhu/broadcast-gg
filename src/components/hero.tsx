import { ArrowDown, ArrowUpRight, Crosshair, Radio } from "lucide-react";
export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow hero-kicker">
          <span className="status-dot" /> SIGNAL LIVE{" "}
          <span className="kicker-divider">/</span> SEU PRÓXIMO JOGO COMEÇA AQUI
        </div>
        <h1>
          <span data-hero-line>O QUE MUDOU.</span>
          <span data-hero-line>O QUE IMPORTA.</span>
          <span className="lime" data-hero-line>
            O QUE JOGAR<span className="outlined-dot">.</span>
          </span>
        </h1>
        <p className="hero-description">
          Seu radar pessoal para acompanhar games, detectar quedas de preço e
          descobrir o que realmente merece seu tempo.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#signals">
            Explorar sinais <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="button ghost" href="#radar">
            <Crosshair size={17} aria-hidden="true" /> Ativar meu radar
          </a>
        </div>
        <div className="hero-note">
          <span className="mini-cross">+</span> MENOS ALGORITMO. MAIS CRITÉRIO.
        </div>
      </div>
      <div
        className="hero-visual"
        aria-label="Ilustração de radar detectando sinais de jogos"
      >
        <div className="radar-topline">
          <span>
            <Radio size={13} aria-hidden="true" /> RADAR SYSTEM / 01
          </span>
          <span className="lime">● ONLINE</span>
        </div>
        <div className="radar-orbit">
          <div className="radar-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="radar-axis horizontal" />
          <div className="radar-axis vertical" />
          <div className="radar-sweep" />
          <div className="radar-center">
            <Crosshair size={27} aria-hidden="true" />
          </div>
          <span className="radar-coordinate coord-n">N</span>
          <span className="radar-coordinate coord-e">E</span>
          <span className="radar-coordinate coord-s">S</span>
          <span className="radar-coordinate coord-w">W</span>
          <div className="radar-blip blip-one" />
          <div className="radar-blip blip-two" />
          <div className="radar-blip blip-three" />
          <div className="radar-tag tag-one">
            <span className="lime">↘ PRICE SIGNAL</span>
            <strong>Cyberpunk 2077</strong>
            <span>
              MENOR PREÇO <b>−60%</b>
            </span>
          </div>
          <div className="radar-tag tag-two">
            <span>↗ TREND SIGNAL</span>
            <strong>Hades II</strong>
            <span>NO NOSSO RADAR</span>
          </div>
        </div>
        <div className="radar-bottomline">
          <span>SCANNING THE NEXT PLAY_</span>
          <span>03 SINAIS DETECTADOS</span>
        </div>
        <div className="scanner" />
      </div>
      <div className="hero-bottom">
        <span>INTELIGÊNCIA PARA O SEU PLAY.</span>
        <a href="#signals">
          SCROLL PARA EXPLORAR <ArrowDown size={13} aria-hidden="true" />
        </a>
        <span className="demo-label">DADOS DEMONSTRATIVOS</span>
      </div>
    </section>
  );
}
