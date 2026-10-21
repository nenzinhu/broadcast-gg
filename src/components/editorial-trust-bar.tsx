import { ArrowUpRight, Database, ShieldCheck, Sparkles } from "lucide-react";

const trustPoints = [
  {
    icon: Database,
    label: "DADOS EM CONTEXTO",
    text: "Preço, nota e plataforma na mesma leitura.",
  },
  {
    icon: ShieldCheck,
    label: "CRITÉRIO TRANSPARENTE",
    text: "Cada sinal explica por que recomenda comprar ou esperar.",
  },
  {
    icon: Sparkles,
    label: "CURADORIA HUMANA",
    text: "Menos ruído de algoritmo. Mais jogos que fazem sentido.",
  },
] as const;

export function EditorialTrustBar() {
  return (
    <section className="editorial-trust" aria-label="Como o Broadcast ajuda você a decidir">
      <div className="editorial-trust-heading">
        <span className="eyebrow"><span className="status-dot" /> POR QUE BROADCAST</span>
        <strong>Um radar para decidir melhor.</strong>
        <a href="/central#catalogo">Conheça o método <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="editorial-trust-grid">
        {trustPoints.map(({ icon: Icon, label, text }) => (
          <div className="editorial-trust-point" key={label}>
            <Icon size={18} aria-hidden="true" />
            <div>
              <span>{label}</span>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
