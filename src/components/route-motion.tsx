"use client";
import { usePathname } from "next/navigation";
import { MotionScope } from "./motion-scope";
export function RouteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <MotionScope key={pathname}>{children}</MotionScope>;
}
