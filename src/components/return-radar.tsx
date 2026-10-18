import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, RefreshCcw, Sparkles, Users } from "lucide-react";
import { GameArtwork } from "@/components/game-artwork";
import { TrackButton } from "@/components/track-button";
import { getGameById } from "@/lib/catalog";
import { returningGames } from "@/lib/returning-games";

export function ReturnRadar() {
  return (
    <div className="return-radar" data-testid="return-radar">
      <div className="return-grid">
        {returningGames.map((item, index) => {
          const game = getGameById(item.gameId);
          if (!game) return null;

          const returnNow = item.verdict === "volte-agora";
          return (
            <article
              key={item.id}
              className="return-card interactive-card"
              data-testid="return-card"
              style={{ "--return-accent": game.color } as CSSProperties}
            >
              <div className="return-art">
                <GameArtwork game={game} />
                <span className="return-index">{String(index + 1).padStart(2, "0")}</span>
                <TrackButton id={game.id} title={game.title} compact />
                <div className="return-art-copy">
                  <span>{item.milestone}</span>
                  <h3>
                    <Link href={`/games/${game.slug}`}>
                      {game.title} <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </h3>
                </div>
              </div>
              <div className="return-content">
                <div className="return-insight">
                  <span className="return-insight-icon"><Sparkles aria-hidden="true" /></span>
                  <div>
                    <strong>O QUE MUDOU</strong>
                    <p>{item.changed}</p>
                  </div>
                </div>
                <div className="return-insight">
                  <span className="return-insight-icon"><Users aria-hidden="true" /></span>
                  <div>
                    <strong>PARA QUEM IMPORTA</strong>
                    <p>{item.mattersTo}</p>
                  </div>
                </div>
                <div className={`return-verdict ${returnNow ? "is-now" : "is-wait"}`}>
                  <RefreshCcw size={15} aria-hidden="true" />
                  <span>VEREDITO</span>
                  <strong>{returnNow ? "VOLTE AGORA" : "ESPERE MAIS"}</strong>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="editorial-disclaimer">
        Leituras editoriais demonstrativas. O melhor momento também depende do seu ritmo e interesse.
      </p>
    </div>
  );
}
