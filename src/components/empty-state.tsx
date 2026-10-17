import { ScanSearch } from "lucide-react";
export function EmptyState({
  kind,
  onReset,
}: {
  kind: "jogo" | "sinal";
  onReset: () => void;
}) {
  return (
    <div className="empty-results" role="status">
      <ScanSearch size={40} aria-hidden="true" />
      <h2>Nenhum {kind} por aqui.</h2>
      <p>
        Tente outra busca. Seu próximo favorito pode estar a um sinal de
        distância.
      </p>
      <button className="button ghost" onClick={onReset}>
        Limpar filtros
      </button>
    </div>
  );
}
