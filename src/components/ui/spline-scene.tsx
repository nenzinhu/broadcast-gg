"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <span className="spline-loader" aria-label="Carregando cena 3D" />,
});

type SplineSceneProps = {
  scene: string;
  className?: string;
};

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={`spline-scene ${className ?? ""}`} aria-hidden="true">
      <Spline scene={scene} />
    </div>
  );
}
