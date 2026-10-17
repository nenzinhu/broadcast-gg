"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { games } from "@/lib/catalog";
import { parseTrackedIds, RADAR_KEY } from "@/lib/radar-storage";
type RadarContextValue = {
  trackedIds: string[];
  toggle: (id: string) => void;
  storageAvailable: boolean;
  ready: boolean;
};
const RadarContext = createContext<RadarContextValue | null>(null);
export function RadarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    trackedIds: [] as string[],
    storageAvailable: true,
    ready: false,
  });
  useEffect(() => {
    let trackedIds: string[] = [];
    let storageAvailable = true;
    try {
      trackedIds = parseTrackedIds(
        localStorage.getItem(RADAR_KEY),
        games.map((g) => g.id),
      );
    } catch {
      storageAvailable = false;
    }
    // Browser storage is an external system; hydrate only after the initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ trackedIds, storageAvailable, ready: true });
    const sync = (event: StorageEvent) => {
      if (event.key === RADAR_KEY || event.key === null)
        setState((previous) => ({
          ...previous,
          trackedIds: parseTrackedIds(
            event.newValue,
            games.map((g) => g.id),
          ),
        }));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function toggle(id: string) {
    if (!state.ready || !games.some((game) => game.id === id)) return;
    const trackedIds = state.trackedIds.includes(id)
      ? state.trackedIds.filter((value) => value !== id)
      : [...state.trackedIds, id];
    let storageAvailable = state.storageAvailable;
    try {
      localStorage.setItem(RADAR_KEY, JSON.stringify(trackedIds));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    setState({ trackedIds, storageAvailable, ready: true });
  }
  return (
    <RadarContext.Provider value={{ ...state, toggle }}>
      {children}
    </RadarContext.Provider>
  );
}
export function useRadar() {
  const value = useContext(RadarContext);
  if (!value) throw new Error("useRadar requires RadarProvider");
  return value;
}
