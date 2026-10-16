"use client";
import { Check, Plus } from "lucide-react";
import { useRadar } from "./radar-provider";
export function TrackButton({
  id,
  title,
  compact = false,
}: {
  id: string;
  title: string;
  compact?: boolean;
}) {
  const { trackedIds, toggle, ready } = useRadar();
  const tracked = trackedIds.includes(id);
  return (
    <button
      type="button"
      className={`track-button ${tracked ? "tracked" : ""} ${compact ? "compact" : ""}`}
      disabled={!ready}
      onClick={() => toggle(id)}
      aria-pressed={tracked}
      aria-label={`${tracked ? "Remover" : "Adicionar"} ${title} ${tracked ? "do" : "ao"} radar`}
    >
      {tracked ? (
        <Check size={16} aria-hidden="true" />
      ) : (
        <Plus size={16} aria-hidden="true" />
      )}
      {!compact && <span>{tracked ? "TRACKING" : "Adicionar ao radar"}</span>}
    </button>
  );
}
