import Link from "next/link";
import { Crosshair, ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found">
      <Crosshair size={64} className="lime" />
      <span className="eyebrow">404 / SIGNAL LOST</span>
      <h1>
        Fora do radar<span className="lime">.</span>
      </h1>
      <p>
        Esse sinal não foi encontrado. Há outros universos esperando por você.
      </p>
      <Link href="/" className="button primary">
        Voltar ao início <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
